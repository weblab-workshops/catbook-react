/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

// without a system for users, we'll have to hardcode our user name
const MY_NAME = "Hackerman";

const data = {
  stories: [
    {
      _id: 0,
      creator_name: "Shannen Wu",
      content: "I love corgis!"
    }
  ],
  comments: [
    {
      _id: 0,
      creator_name: "Jessica Tang",
      parent: 0,
      content: "Wow! Me Too!",
    }
  ],
};

const express = require("express");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send({ message: "Wow I made my first API! In its own file!" });
});

router.get("/stories", (req, res) => {
  // send back all of the stories!
  res.send(data.stories);
});

router.get("/comment", (req, res) => {
  const filteredComments = data.comments.filter(
    (comment) => comment.parent == req.query.parent);
  res.send(filteredComments)
});

module.exports = router;
