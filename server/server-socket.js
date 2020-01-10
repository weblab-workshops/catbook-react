let io, socketmap, usermap;

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

const getUserFromSocketID = (socketid) => usermap[socketid];

const getAllConnectedUsers = () => {
  let activeUsers = Object.values(io.sockets.connected)
    .map((sock) => getUserFromSocketID(sock.id))
    .filter((val) => val != undefined);
  return { activeUsers: removeDuplicates(activeUsers) };
};

const getSocketFromSocketID = (socketid) => {
  return io.sockets.connected[socketid];
};

module.exports = {
  init: (http) => {
    io = require("socket.io")(http);
    // maps user id to socket id
    socketmap = {};
    // maps socket id to user
    usermap = {};
    io.on("connection", (socket) => {
      console.log(`socket has connected ${socket.id}`);
      socket.on("disconnect", (reason) => {
        io.emit("activeUsers", getAllConnectedUsers());
      });
    });
  },

  addUser: (user, socketid) => {
    if (socketmap[user._id]) {
      io.to(socketmap[user._id]).emit("stale");
    }
    socketmap[user._id] = socketid;
    usermap[socketid] = user;
    io.emit("activeUsers", getAllConnectedUsers());
  },

  getSocketFromUserID: (user) => socketmap[user],
  getSocketFromSocketID: getSocketFromSocketID,
  getUserFromSocketID: getUserFromSocketID,
  getAllConnectedUsers: getAllConnectedUsers,
  getIo: () => io,
};
