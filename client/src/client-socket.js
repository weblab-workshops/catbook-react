import socketIOClient from "socket.io-client";
import { post } from "./utilities";
const endpoint = window.location.hostname + ":" + window.location.port;
export const socket = socketIOClient(endpoint);
socket.on("connect", () => {
  post("/api/initsocket", { socketid: socket.id });
});

/** send a message to the server with the move you made in game */
// TODO (Step 2.1): Uncomment the following code. This function will be the client's way of sending move data
//    to the server.
// export const move = (dir) => {
//   socket.emit("move", dir);
// };
