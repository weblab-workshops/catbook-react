import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";
import { drawCanvas } from "../../canvasManager";
import { handleInput } from "../../input";
import { useOutletContext } from "react-router-dom";

import "../../utilities.css";
import "./Game.css";

const Game = () => {
  let props = useOutletContext();
  const canvasRef = useRef(null);

  // add event listener on mount
  useEffect(() => {
    window.addEventListener("keydown", handleInput);

    // remove event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleInput);
    };
  }, []);

  // update game periodically
  useEffect(() => {
    socket.on("update", (update) => {
      processUpdate(update);
    });
    return () => {
      socket.off("update");
    }
  }, []);

  const processUpdate = (update) => {
    drawCanvas(update, canvasRef);
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
