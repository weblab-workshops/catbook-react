import { move } from "./client-socket";

/** Callback function that calls correct movement from key */
export const handleInput = (e) => {
  if (e.key === "ArrowUp") {
    move("up");
  } else if (e.key === "ArrowDown") {
    move("down");
  } else if (e.key === "ArrowLeft") {
    move("left");
  } else if (e.key === "ArrowRight") {
    move("right");
  }
};
