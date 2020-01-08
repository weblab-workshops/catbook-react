/*
|--------------------------------------------------------------------------
| server.js -- The core of your server
|--------------------------------------------------------------------------
|
| This file defines how your server starts up. Think of it as the main() of your server.
| At a high level, this file does the following things:
| - Connect to the database (TODO: WORKSHOP 5)
| - Sets up server middleware (i.e. addons that enable things like json parsing)
| - Hooks up all the backend routes specified in api.js
| - Sets up error handling in case something goes wrong when handling a request
| - Actually starts the webserver
*/

// import libraries needed for the webserver to work!
const express = require("express"); // backend framework for our node server.

// create a new express server
const app = express();

// allow us to parse POST request data using middleware
app.use(express.json());

//create basic GET endpoint at /api/test
app.get("/api/test", (req, res) => {
  res.send({ message: "test API GET endpoint!" });
});

//create basic POST endpoint at /api/post-here
app.post("/api/post-here", (req, res) => {
  res.send({ message: `You sent over ${req.body} data to me!` });
});

// any server errors cause this function to run
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) {
    // 500 means Internal Server Error
    console.log("The server errored when processing a request!");
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
