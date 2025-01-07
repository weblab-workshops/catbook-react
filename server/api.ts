import express, { Request, Response, NextFunction } from "express";
import Story from "./models/story";
import Comment from "./models/comment";
import User from "./models/user";
import Message from "./models/message";
import auth from "./auth";
import socketManager from "./server-socket";

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

// TypeScript interfaces for request and response bodies
interface MessageBody {
  recipient: {
    _id: string;
  };
  content: string;
  recipient_id?: string;
  socketid?: string;
  parent?: string;
}

// Fetch all stories
router.get("/stories", (req: Request, res: Response) => {
  Story.find({}).then((stories) => res.send(stories));
});

// Create a new story
router.post("/story", auth.ensureLoggedIn, (req: Request, res: Response) => {
  const newStory = new Story({
    creator_id: req.user._id,
    creator_name: req.user.name,
    content: req.body.content,
  });

  newStory.save().then((story) => res.send(story));
});

// Get comments for a parent story
router.get("/comment", (req: Request, res: Response) => {
  Comment.find({ parent: req.query.parent }).then((comments) => {
    res.send(comments);
  });
});

// Create a new comment
router.post("/comment", auth.ensureLoggedIn, (req: Request, res: Response) => {
  const newComment = new Comment({
    creator_id: req.user._id,
    creator_name: req.user.name,
    parent: req.body.parent,
    content: req.body.content,
  });

  newComment.save().then((comment) => res.send(comment));
});

// Authentication routes
router.post("/login", auth.login);
router.post("/logout", auth.logout);

// Get current logged-in user
router.get("/whoami", (req: Request, res: Response) => {
  if (!req.user) {
    return res.send({});
  }

  res.send(req.user);
});

// Get user by ID
router.get("/user", (req: Request, res: Response) => {
  User.findById(req.query.userid)
    .then((user) => res.send(user))
    .catch(() => {
      res.status(500).send('User Not Found');
    });
});

// Initialize socket for user
router.post("/initsocket", (req: Request, res: Response) => {
  if (req.user) {
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  }
  res.send({});
});

// Chat messaging
router.get("/chat", (req: Request, res: Response) => {
  let query;
  if (req.query.recipient_id === "ALL_CHAT") {
    query = { "recipient._id": "ALL_CHAT" };
  } else {
    query = {
      $or: [
        { "sender._id": req.user._id, "recipient._id": req.query.recipient_id },
        { "sender._id": req.query.recipient_id, "recipient._id": req.user._id },
      ],
    };
  }

  Message.find(query).then((messages) => res.send(messages));
});

// Send a message
router.post("/message", auth.ensureLoggedIn, (req: Request, res: Response) => {
  const { recipient, content } = req.body as MessageBody;
  console.log(`Received a chat message from ${req.user.name}: ${content}`);

  const message = new Message({
    recipient,
    sender: {
      _id: req.user._id,
      name: req.user.name,
    },
    content,
  });

  message.save();

  if (recipient._id === "ALL_CHAT") {
    socketManager.getIo().emit("message", message);
  } else {
    socketManager.getSocketFromUserID(req.user._id).emit("message", message);
    if (req.user._id !== recipient._id) {
      socketManager.getSocketFromUserID(recipient._id).emit("message", message);
    }
  }
});

// Get active users
router.get("/activeUsers", (req: Request, res: Response) => {
  res.send({ activeUsers: socketManager.getAllConnectedUsers() });
});

// Spawn user to the game
router.post("/spawn", (req: Request, res: Response) => {
  if (req.user) {
    socketManager.addUserToGame(req.user);
  }
  res.send({});
});

// Despawn user from the game
router.post("/despawn", (req: Request, res: Response) => {
  if (req.user) {
    socketManager.removeUserFromGame(req.user);
  }
  res.send({});
});

// Handle unknown routes
router.all("*", (req: Request, res: Response) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

export default router;
