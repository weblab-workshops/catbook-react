const fs = require("fs");
const net = require("net");

/**
 * Provides some basic checks to make sure you've
 * correctly set up your repository.
 *
 * You normally shouldn't need to modify this file.
 *
 * Curent checks:
 * - node_modules exists
 * - makes sure 'npx webpack' was called if required
 * - warns if visiting port 3000 while running hot reloader
 */

class NodeSetupError extends Error {}
let routeChecked = false;

// poke port 5173 to see if 'npm run dev' was possibly called
function checkDevServer() {
  return new Promise((resolve, reject) => {
    var server = net.createServer();

    server.once("error", (err) => {
      resolve(err.code === "EADDRINUSE");
    });

    server.once("listening", () => server.close());
    server.once("close", () => resolve(false));
    server.listen(5173);
  });
}

module.exports = {
  checkSetup: () => {
    if (!fs.existsSync("./node_modules/")) {
      throw new NodeSetupError(
        "node_modules not found! This probably means you forgot to run 'npm install'"
      );
    }
  },

  checkRoutes: (req, res, next) => {
    if (!routeChecked && req.url === "/") {
      checkDevServer().then((active) => {
        if (active) {
          console.log(
            "Warning: It looks like 'npm run dev' may be running. Are you sure you don't want\n" +
              "to use the Vite frontend? To use it, visit http://localhost:5173 and not port 3000"
          );
        }
      });

      routeChecked = true; // only runs once to avoid spam/overhead
    }
    next();
  },
};
