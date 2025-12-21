// /*
// |--------------------------------------------------------------------------
// | server.js -- The core of your server
// |--------------------------------------------------------------------------
// |
// | This file defines how your server starts up. Think of it as the main() of your server.
// | At a high level, this file does the following things:
// | - Connect to the database
// | - Sets up server middleware (i.e. addons that enable things like json parsing, user login)
// | - Hooks up all the backend routes specified in api.js
// | - Fowards frontend routes that should be handled by the React router
// | - Sets up error handling in case something goes wrong when handling a request
// | - Actually starts the webserver
// */
// require('dotenv').config();

// // validator runs some basic checks to make sure you've set everything up correctly
// // this is a tool provided by staff, so you don't need to worry about it
// const validator = require("./validator");
// validator.checkSetup();

// //import libraries needed for the webserver to work!
// const http = require("http");
// const bodyParser = require("body-parser"); // allow node to automatically parse POST body requests as JSON
// const express = require("express"); // backend framework for our node server.
// const session = require("express-session"); // library that stores info about each connected user
// const mongoose = require("mongoose"); // library to connect to MongoDB
// const path = require("path"); // provide utilities for working with file and directory paths

// const api = require("./api");
// const auth = require("./auth");

// // socket stuff
// const socketManager = require("./server-socket");

// // Server configuration below
// // TODO change connection URL after setting up your own database (HINT: you will need to modify the .env file!)
// const mongoConnectionURL = process.env.mongoURL || "mongodb+srv://kenchoi:03CXHjMYM7xUYNh6@cluster0.xbb74.mongodb.net/?retryWrites=true&w=majority";
// // TODO change database name to the name you chose
// const databaseName = process.env.dbName || "Cluster0";

// // connect to mongodb
// mongoose
//   .connect(mongoConnectionURL, {
//     dbName: databaseName,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

// // create a new express server
// const app = express();
// app.use(validator.checkRoutes);

// // set up bodyParser, which allows us to process POST requests
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // set up a session, which will persist login data across requests
// app.use(
//   session({
//     secret: "session-secret",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// // this checks if the user is logged in, and populates "req.user"
// app.use(auth.populateCurrentUser);

// // connect user-defined routes
// app.use("/api", api);

// // load the compiled react files, which will serve /index.html and /bundle.js
// const reactPath = path.resolve(__dirname, "..", "client", "dist");
// app.use(express.static(reactPath));

// // for all other routes, render index.html and let react router handle it
// app.get("*", (req, res) => {
//   res.sendFile(path.join(reactPath, "index.html"));
// });

// // any server errors cause this function to run
// app.use((err, req, res, next) => {
//   const status = err.status || 500;
//   if (status === 500) {
//     // 500 means Internal Server Error
//     console.log("The server errored when processing a request!");
//     console.log(err);
//   }

//   res.status(status);
//   res.send({
//     status: status,
//     message: err.message,
//   });
// });

// // hardcode port to 3000 for now
// const port = 3000;
// const server = http.Server(app);
// socketManager.init(server);

// server.listen(port, () => {
//   console.log(`Server running on port: ${port}`);
// });


require("dotenv").config();

const validator = require("./validator");
validator.checkSetup();

const http = require("http");
const express = require("express");
const session = require("express-session");
const path = require("path");
const fs = require("fs"); // ✅ ADD THIS

const api = require("./api");
const auth = require("./auth");
const socketManager = require("./server-socket");

const { getPool } = require("./db");

// ---- MySQL init (schema on startup) ----
async function initMySQL() {
  const pool = getPool();

  // Verify connection
  await pool.query("SELECT 1");
  console.log("Connected to MySQL ✅");

  // Load schema
  const schemaPath = path.join(__dirname, "schema.sql");
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, "utf8");

    const statements = schemaSql
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const stmt of statements) {
      await pool.query(stmt);
    }

    console.log("Schema ready ✅");
  } else {
    console.log("No schema.sql found; skipping schema init");
  }
}

const app = express();
app.use(validator.checkRoutes);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-session-secret", // ✅ FIX THIS
    resave: false,
    saveUninitialized: false,
  })
);

app.use(auth.populateCurrentUser);

app.use("/api", api);

const reactPath = path.resolve(__dirname, "..", "client", "dist");
app.use(express.static(reactPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(reactPath, "index.html"), (err) => {
    if (err) {
      console.log("Error sending client/dist/index.html:", err.status || 500);
      res.status(err.status || 500).send("Error sending client/dist/index.html - have you run `npm run build`?");
    }
  });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) {
    console.log("The server errored when processing a request!");
    console.log(err);
  }
  res.status(status).send({ status, message: err.message });
});

const port = 3000;
const server = http.Server(app);
socketManager.init(server);

initMySQL()
  .then(() => {
    server.listen(port, () => console.log(`Server running on port: ${port}`));
  })
  .catch((err) => {
    console.error("Failed to start server (DB init failed):", err);
    process.exit(1);
  });
