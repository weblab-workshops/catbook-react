/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

const router = express.Router();

// Use a hardcoded username for now
// TODO: change to a unique name for the workshop
const my_name = "Anonymous";

const data = {
  stories: [
    {
      _id: 0,
      creator_name: "Nicholas Tsao",
      content: "I love dancing!",
    },
  ],
  comments: [
    {
      _id: 0,
      creator_name: "Philena Liu",
      parent: 0,
      content: "Me Too!",
    },
  ],
};

router.get("/test", (req, res) => {
  res.send({ message: "Wow I made my first API! In its own file!" });
});

router.get("/stories", (req, res) => {
  // send back all of the stories!
  res.send(data.stories);
});

router.get("/comment", (req, res) => {
  const filteredComments = data.comments.filter((comment) => comment.parent == req.query.parent);
  res.send(filteredComments);
});

module.exports = router;
