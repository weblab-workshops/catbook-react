let io;

const userToSocketMap = {}; // maps user ID to socket ID
const socketToUserMap = {}; // maps socket ID to userID

// remove duplicate users from a list
const removeDuplicates = (users) => {
  const seen = {}; // set of users we've seen already

  for (const user of users) {
    if (!(user._id in seen)) {
      seen[user._id] = user;
    }
  }

  return Object.values(seen);
};

const getAllConnectedUsers = () => {
  let activeUsers = Object.values(io.sockets.connected)
    .map((sock) => getUserFromSocketID(sock.id))
    .filter((val) => val != undefined);
  return { activeUsers: removeDuplicates(activeUsers) };
};

const getSocketFromUserID = (userid) => userToSocketMap[userid];
const getUserFromSocketID = (socketid) => socketToUserMap[socketid];
const getSocketFromSocketID = (socketid) => io.sockets.connected[socketid];

module.exports = {
  init: (http) => {
    io = require("socket.io")(http);

    io.on("connection", (socket) => {
      console.log(`socket has connected ${socket.id}`);
      socket.on("disconnect", (reason) => {
        io.emit("activeUsers", getAllConnectedUsers());
      });
    });
  },

  addUser: (user, socketid) => {
    const oldSocket = userToSocketMap[user._id];
    if (oldSocket && oldSocket != socketid) {
      // there was an old tab open for this user, force it to disconnect
      io.to(oldSocket).emit("forceDisconnect");
    }
    userToSocketMap[user._id] = socketid;
    socketToUserMap[socketid] = user;
    io.emit("activeUsers", getAllConnectedUsers());
  },

  getSocketFromUserID: getSocketFromUserID,
  getUserFromSocketID: getUserFromSocketID,
  getSocketFromSocketID: getSocketFromSocketID,
  getAllConnectedUsers: getAllConnectedUsers,
  getIo: () => io,
};
