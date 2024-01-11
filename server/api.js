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

// anyscale setup
const ANYSCALE_API_KEY = "";
const MODEL = "meta-llama/Llama-2-13b-chat-hf";
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
  return embedding.data[0].embedding;
};

// chat completion helper function
const chatCompletion = async (query, context) => {
  const prompt = {
    model: MODEL,
    messages: [
      {
        role: "system",
        content:
          "Your role is to answer questions for a user. You are given the following context to help you answer questions: \n" +
          `${context}. \n` +
          "Please do not mention that you were given any context in your response.",
      },
      { role: "user", content: `${query}` },
    ],
    temperature: 0.7,
  };
  const completion = await anyscale.chat.completions.create(prompt);
  return completion.choices[0].message.content;
};

// initialize vector database
const COLLECTION_NAME = "catbook-collection";
const { ChromaClient } = require("chromadb");
const client = new ChromaClient();

let collection;

// sync main and vector dbs
const syncDBs = async () => {
  // retrieve all documents
  const allDocs = await collection.get();
  // delete all documents
  await collection.delete({
    ids: allDocs.ids,
  });
  // retrieve corpus from main db
  const allMongoDocs = await Document.find({});
  const allMongoDocIds = allMongoDocs.map((mongoDoc) => mongoDoc._id.toString());
  const allMongoDocContent = allMongoDocs.map((mongoDoc) => mongoDoc.content);
  let allMongoDocEmbeddings = allMongoDocs.map((mongoDoc) => generateEmbedding(mongoDoc.content));
  allMongoDocEmbeddings = await Promise.all(allMongoDocEmbeddings); // ensure embeddings finish generating
  // add corpus to vector db
  await collection.add({
    ids: allMongoDocIds,
    embeddings: allMongoDocEmbeddings,
    documents: allMongoDocContent,
  });
  console.log("number of documents", await collection.count());
  console.log("finished initializing chroma collection");
};

const initCollection = async () => {
  collection = await client.getOrCreateCollection({
    name: COLLECTION_NAME,
  });
  // initialize collection embeddings with corpus
  // in production, this function should not run that often, so it is OK to resync the two dbs here
  await syncDBs();
};

initCollection();

// retrieving context helper function
const NUM_DOCUMENTS = 2;
const retrieveContext = async (query, k) => {
  const queryEmbedding = await generateEmbedding(query);
  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: k,
  });
  return results.documents;
};

// RAG
const retrievalAugmentedGeneration = async (query) => {
  const context = await retrieveContext(query, NUM_DOCUMENTS);
  const llmResponse = await chatCompletion(query, context);
  return llmResponse;
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
        embeddings: [embedding],
        documents: [document.content],
      });
      res.send(document);
    } catch (error) {
      console.log("error:", error);
      res.status(500);
      res.send({});
    }
  };

  addDocument(newDocument);
});

router.get("/document", (req, res) => {
  retrieveContext("hello", NUM_DOCUMENTS).then(() => {
    Document.find({}).then((documents) => res.send(documents));
  });
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
  const makeQuery = async () => {
    try {
      const queryresponse = await retrievalAugmentedGeneration(req.body.query);
      res.send({ queryresponse });
    } catch (error) {
      console.log("error:", error);
      res.status(500);
      res.send({});
    }
  };
  makeQuery();
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
