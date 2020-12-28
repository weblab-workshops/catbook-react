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

// import libraries needed for the webserver to work!
const express = require("express"); // backend framework for our node server.
const path = require("path"); // provide utilities for working with file and directory paths

// create a new express server
const app = express();

app.get("/api/test", (req, res) => {
  res.send({ message: "Wow I made my first API!" });
});

// any server errors cause this function to run
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if( status === 500 ){
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

// Load the compiled react files, which will serve /index.html and /bundle.js
const reactPath = path.resolve(__dirname, "..", "client", "dist");
app.use(express.static(reactPath));

// for all other routes, render index.html and let the react router handle it
app.get("*", (req, res) => {
  res.sendFile(path.join(reactPath, "index.html"));
});

// hardcode port to 3000 for now
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
