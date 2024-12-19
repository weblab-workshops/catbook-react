import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";
import { drawCanvas } from "../../canvasManager";

import "../../utilities.css";
import "./Game.css";

const Game = (props) => {
  const canvasRef = useRef(null);

  // TODO (Step 1.5, pt 2): update game periodically using useEffect hook
  useEffect(() => {
    
  }, []);

  const processUpdate = (update) => {
    // TODO (Step 1.5): call drawCanvas using the `update` transmitted to the socket
    // (`update` is the current `gameState`)
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
