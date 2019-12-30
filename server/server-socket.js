let io, socketmap;

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
    .map((sock) => sock.user)
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
    io.on("connection", (socket) => {
      console.log(`socket has connected ${socket.id}`);
      socket.on("disconnect", (reason) => {
        io.emit("activeUsers", getAllConnectedUsers());
      });
    });
  },

  addUser: (user, socketid) => {
    const socket = getSocketFromSocketID(socketid);
    socket.user = user;

    // every tab open by this user joins a "room"
    socket.join(user._id);

    socketmap[user._id] = socketid;
    io.emit("activeUsers", getAllConnectedUsers());
  },

  getSocketFromUserID: (user) => socketmap[user],
  getSocketFromSocketID: getSocketFromSocketID,

  getAllConnectedUsers: getAllConnectedUsers,
  getIo: () => io,
};
