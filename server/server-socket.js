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

const addUser = (user, socket) => {
  const oldSocket = userToSocketMap[user._id];

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
      // TODO (Step 2.5): Turn on a socket that listens for the 'move' event
      // and calls gameLogic.movePlayer
    });
  },

  addUser: addUser,
  removeUser: removeUser,

  getSocketFromUserID: getSocketFromUserID,
  getUserFromSocketID: getUserFromSocketID,
  getSocketFromSocketID: getSocketFromSocketID,
  getAllConnectedUsers: getAllConnectedUsers,
  getIo: () => io,
};
