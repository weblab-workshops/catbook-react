let io, socketmap;

const getAllConnectedUsers = () => {
  let activeUsers = Object.values(io.sockets.connected)
    .map((sock) => sock.user)
    .filter((val) => val != undefined);
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
    const existingSocketId = socketmap[user]; // is this user already in socketmap?
    if (getSocketFromSocketID(existingSocketId) && existingSocketId != socketid) {
      getSocketFromSocketID(existingSocketId).disconnect();
    }
    socketmap[user] = socketid;
  },
  getSocketFromUserID: (user) => socketmap[user],
  getAllConnectedUsers: getAllConnectedUsers,
  getIo: () => io,

  getSocketFromSocketID: getSocketFromSocketID,
};
