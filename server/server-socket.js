const gameLogic = require("./game-logic");

let io;

const userToSocketMap = {}; // maps user ID to socket object
const socketToUserMap = {}; // maps socket ID to user object

const getAllConnectedUsers = () => Object.values(socketToUserMap);
const getSocketFromUserID = (userid) => userToSocketMap[userid];
const getUserFromSocketID = (socketid) => socketToUserMap[socketid];
const getSocketFromSocketID = (socketid) => io.sockets.connected[socketid];

/** Send game state to client */
const sendGameState = () => {
  io.emit("update", gameLogic.gameState);
};

/** Start running game: game loop emits game states to all clients at 60 frames per second */
const startRunningGame = () => {
  setInterval(() => {
    gameLogic.updateGameState();
    sendGameState();
  }, 1000 / 60); // 60 frames per second
};

startRunningGame();

// TODO (Step 6.1): Fill out the addUserToGame and removeUserFromGame functions to call
//    spawnPlayer and removePlayer functions from gameLogic. Make sure you pass in the user's id.
const addUserToGame = (user) => {
  // Your code here (Step 6.1)
};

const removeUserFromGame = (user) => {
  // Your code here (Step 6.1)
};

const addUser = (user, socket) => {
  const oldSocket = userToSocketMap[user._id];

  // TODO (Step 6.1): Remove this call to spawnPlayer, since now we have a spawn button.
  gameLogic.spawnPlayer(user._id);
  if (oldSocket && oldSocket.id !== socket.id) {
    // there was an old tab open for this user, force it to disconnect
    oldSocket.disconnect();
    delete socketToUserMap[oldSocket.id];
  }

  userToSocketMap[user._id] = socket;
  socketToUserMap[socket.id] = user;
  io.emit("activeUsers", { activeUsers: getAllConnectedUsers() });
};

const removeUser = (user, socket) => {
  if (user) {
    delete userToSocketMap[user._id];
    // TODO (Step 6.4): call removeUserFromGame on disconnect;
    // a user should disconnect from game if they disconnect from site
    // removeUserFromGame(user);
  }
  delete socketToUserMap[socket.id];
  io.emit("activeUsers", { activeUsers: getAllConnectedUsers() });
};

module.exports = {
  init: (http) => {
    io = require("socket.io")(http);

    io.on("connection", (socket) => {
      console.log(`socket has connected ${socket.id}`);
      socket.on("disconnect", (reason) => {
        const user = getUserFromSocketID(socket.id);
        removeUser(user, socket);
      });
      socket.on("move", (dir) => {
        // Listen for moves from client and move player accordingly
        const user = getUserFromSocketID(socket.id);
        if (user) gameLogic.movePlayer(user._id, dir);
      });
    });
  },

  addUser: addUser,
  removeUser: removeUser,

  getSocketFromUserID: getSocketFromUserID,
  getUserFromSocketID: getUserFromSocketID,
  getSocketFromSocketID: getSocketFromSocketID,
  getAllConnectedUsers: getAllConnectedUsers,
  addUserToGame: addUserToGame,
  removeUserFromGame: removeUserFromGame,
  getIo: () => io,
};
