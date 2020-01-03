/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const fs = require("fs");

// we haven't set up user login yet, so just
// use a hardcoded name for now
// TODO change to a unique name for workshop
const MY_NAME = "Anonymous User";

let data = {
  stories: [],
  comments: [],
};

function readDataFromFile() {
  if (!fs.existsSync("data.txt")) return;
  fs.readFile("data.txt", (err, fileData) => {
    data = JSON.parse(fileData);
  });
}

function writeDataToFile() {
  fs.writeFile("data.txt", JSON.stringify(data), (err) => {
    if (err) console.log(err);
  });
}

// read existing data from the file when the server starts up
readDataFromFile();

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
  writeDataToFile();

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
  writeDataToFile();

  res.send(newComment);
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
