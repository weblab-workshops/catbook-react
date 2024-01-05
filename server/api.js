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

// we haven't set up user login yet, so just
// use a hardcoded name for now
// TODO (step2) change to a unique name for workshop
const myName = "Anonymous";

const data = {
  stories: [
    {
      _id: 0,
      creator_name: "Tony Cui",
      content: "Send it or blend it?",
    },
    // TODO (step1) Add new story!
  ],
  comments: [
    {
      _id: 0,
      creator_name: "Stanley Zhao",
      parent: 0,
      content: "Both!",
    },
  ],
};

// an example GET route
router.get("/test", (req, res) => {
  res.send({ message: "Wow I made my first API!" });
});

module.exports = router;
