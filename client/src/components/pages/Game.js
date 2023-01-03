import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";
import { drawCanvas } from "../../canvasManager";

import "../../utilities.css";
import "./Game.css";

const Game = (props) => {
  // TODO (Step 2.5, pt 2): update game periodically using useEffect hook
  // Uncomment the following code:
  // useEffect(() => {
  //   socket.on("update", (update) => {
  //     processUpdate(update);
  //   });
  // }, []);

  const processUpdate = (update) => {
    // TODO (Step 2.5): call drawCanvas on the `update` transmitted to the socket
    // (`update` is the current `gameState`)
    // Uncomment the following line:
    // drawCanvas(update);
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
