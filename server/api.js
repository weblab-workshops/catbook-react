/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const Story = require("./models/story");
const Comment = require("./models/comment");
const User = require("./models/user");
const Message = require("./models/message");
const Document = require("./models/document");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

const socketManager = require("./server-socket");

// initialize vector database
const COLLECTION_NAME = "catbook-collection";
const { ChromaClient } = require("chromadb");
const client = new ChromaClient();

let collection;

async function initCollection() {
  collection = await client.getOrCreateCollection({
    name: COLLECTION_NAME,
  });
  // remove existing documents
  // initialize collection embeddings with corpus
  console.log(await collection.count());
  // Document.find({}).then((documents) => res.send(documents));
}

initCollection();

// initialize anyscale objects
const ANYSCALE_API_KEY = "";
const { OpenAI } = require("openai");
const anyscale = new OpenAI({
  baseURL: "https://api.endpoints.anyscale.com/v1",
  apiKey: ANYSCALE_API_KEY,
});

// embedding helper function
const generateEmbedding = async (document) => {
  const embedding = await anyscale.embeddings.create({
    model: "thenlper/gte-large",
    // model: "text-embedding-ada-002", (anyscale doesn't have access to this model)
    input: document,
  });
  return embedding;
};

// chat completion helper function
const chatCompletion = async (query, context) => {
  const completion = await anyscale.chat.completions.create({
    model: "meta-llama/Llama-2-70b-chat-hf",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. You are given some context to help you answer user questions",
      },
      {
        role: "system",
        content: context,
      },
      { role: "user", content: query },
    ],
    temperature: 0.7,
  });
  console.log(completion);
};

router.get("/stories", (req, res) => {
  // empty selector means get all documents
  Story.find({}).then((stories) => res.send(stories));
});

router.post("/story", auth.ensureLoggedIn, (req, res) => {
  const newStory = new Story({
    creator_id: req.user._id,
    creator_name: req.user.name,
    content: req.body.content,
  });

  newStory.save().then((story) => res.send(story));
});

router.get("/comment", (req, res) => {
  Comment.find({ parent: req.query.parent }).then((comments) => {
    res.send(comments);
  });
});

router.post("/comment", auth.ensureLoggedIn, (req, res) => {
  const newComment = new Comment({
    creator_id: req.user._id,
    creator_name: req.user.name,
    parent: req.body.parent,
    content: req.body.content,
  });

  newComment.save().then((comment) => res.send(comment));
});

router.post("/document", (req, res) => {
  const newDocument = new Document({
    content: req.body.content,
  });

  const addDocument = async (document) => {
    try {
      await document.save();
      const embedding = await generateEmbedding(document.content);
      await collection.add({
        ids: [document._id.toString()],
        embeddings: [embedding.data[0].embedding],
        documents: [document.content],
      });
      res.send(document);
    } catch (error) {
      console.log("error:", error);
      res.status(400);
      res.send({});
    }
  };

  addDocument(newDocument);
});

router.get("/document", (req, res) => {
  Document.find({}).then((documents) => res.send(documents));
});

router.post("/updateDocument", (req, res) => {
  const updateDocument = async (id) => {
    const document = await Document.findById(id);
    document.content = req.body.content;
    await document.save();
    await collection.modify({
      ids: [document._id],
      documents: [document.content],
    });
    res.send({});
  };
  updateDocument(req.body._id);
});

router.post("/deleteDocument", (req, res) => {
  const deleteDocument = async (id) => {
    const document = await Document.findById(id);
    if (!document) res.send({});
    try {
      await collection.delete({
        ids: [document._id],
      });
      await document.remove();
      res.send({});
    } catch {
      // if deleting from the vector db failed (e.g., it doesn't exist)
      await document.remove();
      res.send({});
    }
  };
  deleteDocument(req.body._id);
});

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.get("/chat", (req, res) => {
  let query;
  if (req.query.recipient_id === "ALL_CHAT") {
    // get any message sent by anybody to ALL_CHAT
    query = { "recipient._id": "ALL_CHAT" };
  } else {
    // get messages that are from me->you OR you->me
    query = {
      $or: [
        { "sender._id": req.user._id, "recipient._id": req.query.recipient_id },
        { "sender._id": req.query.recipient_id, "recipient._id": req.user._id },
      ],
    };
  }

  Message.find(query).then((messages) => res.send(messages));
});

router.post("/message", auth.ensureLoggedIn, (req, res) => {
  console.log(`Received a chat message from ${req.user.name}: ${req.body.content}`);

  // insert this message into the database
  const message = new Message({
    recipient: req.body.recipient,
    sender: {
      _id: req.user._id,
      name: req.user.name,
    },
    content: req.body.content,
  });
  message.save();

  if (req.body.recipient._id == "ALL_CHAT") {
    socketManager.getIo().emit("message", message);
  } else {
    socketManager.getSocketFromUserID(req.user._id).emit("message", message);
    if (req.user._id !== req.body.recipient._id) {
      socketManager.getSocketFromUserID(req.body.recipient._id).emit("message", message);
    }
  }
});

router.get("/activeUsers", (req, res) => {
  res.send({ activeUsers: socketManager.getAllConnectedUsers() });
});

router.post("/spawn", (req, res) => {
  if (req.user) {
    socketManager.addUserToGame(req.user);
  }
  res.send({});
});

router.post("/despawn", (req, res) => {
  if (req.user) {
    socketManager.removeUserFromGame(req.user);
  }
  res.send({});
});

router.post("/query", (req, res) => {
  // NOTE: this is very inefficient!
  // you should try to look for some alternative methods for querying directly inside of express,
  // so you don't have to query the entire database everytime you want to make a query
  // this is just to demonstrate how RAG works (:
  Document.find({}).then((documents) => {
    const docContents = documents.map((doc) => doc.content);
    let { spawn } = require("child_process");
    let child = spawn("python3", [
      "server/model.py",
      JSON.stringify({ docs: docContents, query: req.body.query }),
    ]);
    child.stdout.on("data", (data) => res.send({ queryresponse: data.toString() }));
    child.on("error", () => res.send({ queryresponse: "error querying llm!" }));
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
