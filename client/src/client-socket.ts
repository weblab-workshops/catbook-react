import socketIOClient, { Socket } from "socket.io-client";
import { post } from "./utilities";

// Define the socket endpoint based on the current window's location
const endpoint = `${window.location.hostname}:${window.location.port}`;

// Type the socket variable
export const socket: Socket = socketIOClient(endpoint);

// On socket connection, send the socket id to the server
socket.on("connect", () => {
  post("/api/initsocket", { socketid: socket.id });
});

/** Send a message to the server with the move you made in game */
export const move = (dir: string): void => {
  socket.emit("move", dir);
};
