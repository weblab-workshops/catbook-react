const sharedsession = require("express-socket.io-session");
let io;

module.exports = {
  init: (http, session) => {
    io = require("socket.io")(http);
    //set up socket middleware
    io.use(
      sharedsession(session, {
        autoSave: true,
      })
    );

    io.use((socket, next) => {
      if (socket.handshake.session.passport) {
        socket.userId = socket.handshake.session.passport.user;
      } else {
        socket.userId = undefined;
      }
      next();
    });

    io.on("connection", (socket) => {});
  },

  getIo: () => io,
};
