let io;

const userToSocketMap = {}; // maps user ID to socket ID
const socketToUserMap = {}; // maps socket ID to user object

const getAllConnectedUsers = () => Object.values(socketToUserMap);
const getSocketFromUserID = (userid) => userToSocketMap[userid];
const getUserFromSocketID = (socketid) => socketToUserMap[socketid];
const getSocketFromSocketID = (socketid) => io.sockets.connected[socketid];

const addUser = (user, socketid) => {
  const oldSocket = userToSocketMap[user._id];
  if (oldSocket && oldSocket != socketid) {
    // there was an old tab open for this user, force it to disconnect
    getSocketFromSocketID(oldSocket).disconnect();
    delete socketToUserMap[oldSocket];
  }

  userToSocketMap[user._id] = socketid;
  socketToUserMap[socketid] = user;
  io.emit("activeUsers", { activeUsers: getAllConnectedUsers() });
};

const removeUser = (user, socketid) => {
  if (user) delete userToSocketMap[user.id];
  delete socketToUserMap[socketid];
  io.emit("activeUsers", { activeUsers: getAllConnectedUsers() });
};

module.exports = {
  init: (http) => {
    io = require("socket.io")(http);

    io.on("connection", (socket) => {
      console.log(`socket has connected ${socket.id}`);
      socket.on("disconnect", (reason) => {
        const user = getUserFromSocketID(socket.id);
        removeUser(user, socket.id);
      });
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
