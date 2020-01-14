import socketIOClient from "socket.io-client";
import { post } from "./utilities";
const NOP = () => {};

// disable websockets for this lecture
export const socket = {
  on: NOP,
  id: "MOCK_ID",
};
