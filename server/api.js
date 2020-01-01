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
