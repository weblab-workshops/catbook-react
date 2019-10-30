const express = require("express");

// import models so we can interact with the database
const Story = require("../models/story");
const Comment = require("../models/comment");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

router.get("/whoami", (req, res) => {
  res.send({ _id: "testid" });
});

router.get("/user", (req, res) => {
  // we haven't set up user login yet, so just return
  // some placeholder data for now
  res.send({
    _id: "testid",
    name: "Test User",
    last_post: "Placeholder post"
  });
});

router.get("/stories", (req, res) => {
  // empty selector means get all documents
  Story.find({}).then(stories => res.send(stories));
});

router.post("/story", (req, res) => {
  const newStory = new Story({
    creator_id: "testid",
    creator_name: "Test User",
    content: req.body.content
  });

  newStory.save().then(() => res.send({}));
});

router.get("/comment", (req, res) => {
  Comment.find({ parent: req.query.parent }).then(comments => {
    res.send(comments);
  });
});

router.post("/comment", (req, res) => {
  const newComment = new Comment({
    creator_id: "testid",
    creator_name: "Test User",
    parent: req.body.parent,
    content: req.body.content
  });

  newComment.save().then(() => res.send({}));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
