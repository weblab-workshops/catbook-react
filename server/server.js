/*
|--------------------------------------------------------------------------
| server.js -- The core of your server
|--------------------------------------------------------------------------
|
| This file defines how your server starts up. Think of it as the main() of your server.
| At a high level, this file does the following things:
| - Connect to the database (TODO: WORKSHOP 5)
| - Sets up server middleware (i.e. addons that enable things like json parsing) (TODO: WORKSHOP 3)
| - Hooks up all the backend routes specified in api.js (TODO: WORKSHOP 4)
| - Sets up error handling in case something goes wrong when handling a request (TODO: WORKSHOP 3)
| - Actually starts the webserver
*/
require('dotenv').config();

// import libraries needed for the webserver to work!
const express = require("express"); // backend framework for our node server.
const path = require("path"); // provide utilities for working with file and directory paths

// create a new express server
const app = express();

// allow us to make post requests
app.use(express.json());

// TODO (step5): implement middleware for /api routes
app.use("/api", require("./api"));

// anything else falls to this "not found" case
app.all("*", (req, res) => {
  console.log(`Route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "Route not found" });
});

// any server errors cause this function to run
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) {
    // 500 means Internal Server Error
    console.log("The server errored when processing a request");
    console.log(err);
  }

  res.status(status);
  res.send({
    status: status,
    message: err.message,
  });
});

// hardcode port to 3000 for now
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});