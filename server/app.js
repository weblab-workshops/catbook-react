const http = require("http");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const config = require("../config.json");
const api = require("./routes/api");
const app = express();

// reactPath is the location of the compiled react files
const reactPath = path.resolve(__dirname, "..", "client", "dist");

// connect to mongodb
mongoose
  .connect(config.mongoSRV, {
    useNewUrlParser: true,
    dbName: config.dbName
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(`Error connecting to MongoDB: ${err}`));

// set up bodyParser, which allows us to process POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect API routes
app.use("/api", api);

// serve /index.html and /bundle.js
app.use(express.static(reactPath));

// for all other routes, load index.html and let react router handle them
app.get("*", (req, res) => {
  res.sendFile(path.join(reactPath, "index.html"));
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
    status: err.status,
    message: err.message
  });
});

// port defaults to 3000, can be changed in config.json
const port = config.port || 3000;
const server = http.Server(app);

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
