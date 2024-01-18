import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";
import { drawCanvas } from "../../canvasManager";

import "../../utilities.css";
import "./Game.css";

const Game = (props) => {
  const canvasRef = useRef(null);

  // TODO (Step 1.5, pt 2): update game periodically using useEffect hook
  // Uncomment the following code:
  // useEffect(() => {
  //   socket.on("update", (update) => {
  //     processUpdate(update);
  //   });
  // }, []);

  const processUpdate = (update) => {
    // TODO (Step 1.5): call drawCanvas on the `update` transmitted to the socket
    // (`update` is the current `gameState`)
    // Uncomment the following line:
    // drawCanvas(update, canvasRef);
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
        <canvas ref={canvasRef} width="500" height="500" />
        {loginModal}
      </div>
    </>
  );
};

export default Game;
