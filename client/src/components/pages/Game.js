import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";
import { drawCanvas } from "../../canvasManager";
import { handleInput } from "../../input";

import "../../utilities.css";
import "./Game.css";

const Game = (props) => {
  // add event listener on mount
  useEffect(() => {
    // TODO (Step 3.3): add event listener when the page is loaded (1 line)
    // Hint: `window` is a global variable on which you should call `addEventListener`
    // The type of event listener is "keydown", and the listener is the `handleInput` function
    // we imported from input.js. Refer to documentation for `addEventListener` here:
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    // Your code goes here!

    // remove event listener on unmount
    return () => {
      // TODO (Step 3.3, pt 2): remove event listener when the page unmounts (1 line)
      // This return statement allows us to run code when the user leaves the page.
      // Hint: `window` also has a `removeEventListener` method
      // Your code goes here!
    };
  }, []);

  // update game periodically
  useEffect(() => {
    socket.on("update", (update) => {
      processUpdate(update);
    });
  }, []);

  const processUpdate = (update) => {
    drawCanvas(update);
  };

  // display text if the player is not logged in
  let loginModal = null;
  if (!props.userId) {
    loginModal = <div> Please Login First! </div>;
  }

  return (
    <>
      <div>
        {/* important: canvas needs id to be referenced by canvasManager */}
        <canvas id="game-canvas" width="500" height="500" />
        {loginModal}
      </div>
    </>
  );
};

export default Game;
