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

// an example GET route
router.get("/test", (req, res) => {
  res.send({ message: "Wow I made my first API!" });
});

module.exports = router;
