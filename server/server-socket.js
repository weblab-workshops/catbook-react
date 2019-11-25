let io, socketmap;

const getAllConnectedUsers = () => {
  let activeUsers = Object.values(io.sockets.connected)
    .map((sock) => {
      return sock.user;
    })
    .filter((val) => val);
  return { activeUsers: activeUsers };
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
        // console.log("disconnected");
        // console.log(getAllConnectedUsers());
        io.emit("activeUsers", getAllConnectedUsers());
      });
    });
  },
  addUser: (user, socketid) => {
    if (socketmap[user] && getSocketFromSocketID(socketmap[user])) {
      getSocketFromSocketID(socketmap[user]).disconnect();
    }
    socketmap[user] = socketid;
    // io.emit("activeUsers", getAllConnectedUsers());
  },
  getSocketFromUserID: (user) => socketmap[user],
  getAllConnectedUsers: getAllConnectedUsers,
  getIo: () => io,

  getSocketFromSocketID: getSocketFromSocketID,
};
