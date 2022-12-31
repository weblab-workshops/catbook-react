import { move } from "./client-socket";

/** add other controls here */
const handleInput = (e) => {
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

// TODO: if player in game, add event listener for keydowns
// TODO: if player not in game, remove event listener for keydowns
// may need to move to a different file

/**
 * adds a *window* listener for any keydowns.
 *
 * THIS IS GLOBAL
 *
 * That this means *any time* you press an arrow key you'll move if you're on the site
 * */
// window.addEventListener("keydown", handleInput);
