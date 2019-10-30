const fs = require("fs");
const net = require("net");

class NodeSetupError extends Error {}
let dev = false;

/**
 * Provides some basic checks to make sure you've
 * correctly set up your repository.
 *
 * You normally shouldn't need to modify this file.
 */
module.exports = {
  checkSetup: () => {
    if (!fs.existsSync("./node_modules/")) {
      throw new NodeSetupError(
        "node_modules not found! This probably means you forgot to run 'npm install'"
      );
    }

    if (!fs.existsSync("./config.json")) {
      throw new NodeSetupError(
        "config.json not found! Run 'cp config.template.json config.json' and make sure it's filled out correctly"
      );
    }

    let config;
    try {
      config = require("../config.json");
      if (!config.mongoSRV) {
        throw new NodeSetupError(
          "Could not find mongoSRV. Make sure this value is set up properly in config.json"
        );
      }
    } catch (e) {
      throw new NodeSetupError(
        "Failed to parse config.json. Make sure the contents are properly-formatted json"
      );
    }

    // poke port 5000 to see if 'npm run dev' was called
    var net = require("net");
    var server = net.createServer();

    server.once("error", err => {
      dev = err.code === "EADDRINUSE";
    });

    server.once("listening", () => server.close);

    server.listen(5000);
  },

  checkRoutes: (req, res, next) => {
    if (req.url === "/") {
      // if the server receives a request on /, we must be on port 3000 not 5000
      if (!fs.existsSync("./client/dist/bundle.js")) {
        throw new NodeSetupError(
          "Couldn't find bundle.js! If you want to run the hot reloader, make sure 'npm run dev'\n" +
            "is running and then go to http://localhost:5000 instead of port 3000.\n" +
            "If you're not using the hot reloader, make sure to run 'npx webpack' before visiting this page"
        );
      }

      if (dev) {
        console.log(
          "Warning: It looks like 'npm run dev' may be running. Are you sure you don't want\n" +
            "to use the hot reloader? To use it, visit http://localhost:5000 and not port 3000"
        );
      }
    }
    next();
  }
};
