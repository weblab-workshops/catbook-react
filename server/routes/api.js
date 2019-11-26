/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server. 
|
*/

const express = require("express");

let data = { stories: [], comments: [] };

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

// we haven't set up user login yet, so just
// use a hardcoded name for now
// TODO change to a unique name for workshop
const MY_NAME = "Anonymous User";

router.get("/stories", (req, res) => {
  // empty selector means get all documents
  res.send(data.stories);
});

router.post("/story", (req, res) => {
  const newStory = {
    _id: data.stories.length,
    creator_name: MY_NAME,
    content: req.body.content,
  };

  data.stories.push(newStory);
});

router.get("/comment", (req, res) => {
  const filteredComments = data.comments.filter((comment) => comment.parent == req.query.parent);
  console.log(filteredComments);

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
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
