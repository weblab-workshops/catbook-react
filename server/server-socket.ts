import { Server } from "socket.io";
import http from "http";
import * as gameLogic from "./game-logic";

let io: Server;

const userToSocketMap: Record<string, any> = {}; // maps user ID to socket object
const socketToUserMap: Record<string, any> = {}; // maps socket ID to user object

const getAllConnectedUsers = () => Object.values(socketToUserMap);
const getSocketFromUserID = (userid: string) => userToSocketMap[userid];
const getUserFromSocketID = (socketid: string) => socketToUserMap[socketid];
const getSocketFromSocketID = (socketid: string) => io.sockets.sockets.get(socketid);

/** Send game state to client */
const sendGameState = (): void => {
  io.emit("update", gameLogic.gameState);
};

/** Start running game: game loop emits game states to all clients at 60 frames per second */
const startRunningGame = (): void => {
  let winResetTimer = 0;
  setInterval(() => {
    gameLogic.updateGameState();
    sendGameState();

    // Reset game 5 seconds after someone wins.
    if (gameLogic.gameState.winner != null) {
      winResetTimer += 1;
    }
    if (winResetTimer > 60 * 5) {
      winResetTimer = 0;
      gameLogic.resetWinner();
    }
  }, 1000 / 60); // 60 frames per second
};

startRunningGame();

const addUserToGame = (user: { _id: string }): void => {
  gameLogic.spawnPlayer(user._id);
};

const removeUserFromGame = (user: { _id: string }): void => {
  gameLogic.removePlayer(user._id);
};

const addUser = (user: { _id: string }, socket: any): void => {
  const oldSocket = userToSocketMap[user._id];
  if (oldSocket && oldSocket.id !== socket.id) {
    // there was an old tab open for this user, force it to disconnect
    oldSocket.disconnect();
    delete socketToUserMap[oldSocket.id];
  }

  userToSocketMap[user._id] = socket;
  socketToUserMap[socket.id] = user;
  io.emit("activeUsers", { activeUsers: getAllConnectedUsers() });
};

const removeUser = (user: { _id: string } | undefined, socket: any): void => {
  if (user) {
    delete userToSocketMap[user._id];
    removeUserFromGame(user); // Remove user from game if they disconnect
  }
  delete socketToUserMap[socket.id];
  io.emit("activeUsers", { activeUsers: getAllConnectedUsers() });
};

export const init = (httpServer: http.Server): void => {
  io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log(`socket has connected ${socket.id}`);
    socket.on("disconnect", (reason) => {
      const user = getUserFromSocketID(socket.id);
      removeUser(user, socket);
    });
    socket.on("move", (dir: string) => {
      // Listen for moves from client and move player accordingly
      const user = getUserFromSocketID(socket.id);
      if (user) gameLogic.movePlayer(user._id, dir);
    });
  });
};

const getIo = (): Server => io;

export default {
  init,
  addUser,
  removeUser,
  getSocketFromUserID,
  getUserFromSocketID,
  getSocketFromSocketID,
  getAllConnectedUsers,
  addUserToGame,
  removeUserFromGame,
  getIo,
};
