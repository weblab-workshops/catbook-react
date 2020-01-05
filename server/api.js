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
const Story = require("./models/story")

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();


router.get("/stories", (req, res) => {
  
});

router.post("/story", (req, res) => {
  
});

router.get("/comment", (req, res) => {
  Comment.find({ /* input the parent parameter here*/ }).then((comments) => {
    res.send(comments);
  });
});

router.post("/comment", (req, res) => {
  
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});


module.exports = router;
