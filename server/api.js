/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

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