import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";
import { useOutletContext } from "react-router-dom";
import { drawCanvas } from "../../canvasManager";


import "../../utilities.css";
import "./Game.css";

const Game = () => {
  let props = useOutletContext();

  // TODO (Step 0.3): set up userId props using useOutletContext
  const canvasRef = useRef(null);
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
