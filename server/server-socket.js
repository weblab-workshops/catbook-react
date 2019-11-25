let io, socketmap;

module.exports = {
  init: (http) => {
    io = require("socket.io")(http);
    // maps user id to socket id
    socketmap = {};
    io.on("connection", (socket) => {
      console.log(`socket has connected ${socket.id}`);
    });
  },
  addUser: (user, socketid) => (socketmap[user] = socketid),
  getSocketFromUserID: (user) => socketmap[user],

  getIo: () => io,
};
