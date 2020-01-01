/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// we haven't set up user login yet, so just
// use a hardcoded name for now
// TODO change to a unique name for workshop
const MY_NAME = "Anonymous User";

let data = {
  stories: [
    {
      _id: 0,
      creator_name: "Shannen Wu",
      content: "I love corgis!",
    },
  ],
  comments: [
    {
      _id: 0,
      creator_name: "Jessica Tang",
      parent: 0,
      content: "Wow! Me too!",
    },
  ],
};

const router = express.Router();

// an example GET route
router.get("/test", (req, res) => {
  res.send({ message: "it works" });
});

router.get("/stories", (req, res) => {
  // just send back all of the stories!
  res.send(data.stories);
});

router.post("/story", (req, res) => {
  const newStory = {
    _id: data.stories.length,
    creator_name: MY_NAME,
    content: req.body.content,
  };

  data.stories.push(newStory);
  res.send(newStory);
});

router.get("/comment", (req, res) => {
  // determine which comments are children of the requested story
  const filteredComments = data.comments.filter((comment) => comment.parent == req.query.parent);
  res.send(filteredComments);
});

router.post("/comment", (req, res) => {
  const newComment = {
    _id: data.comments.length,
    creator_name: MY_NAME,
    parent: req.body.parent,
    content: req.body.content,
  };

  data.comments.push(newComment);
  res.send(newComment);
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
