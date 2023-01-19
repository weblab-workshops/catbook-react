import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";
import { drawCanvas } from "../../canvasManager";
import { handleInput } from "../../input";

import "../../utilities.css";
import "./Game.css";

const Game = (props) => {
  const canvasRef = useRef(null);
  const [winnerModal, setWinnerModal] = useState(null);

  // add event listener on mount
  useEffect(() => {
    window.addEventListener("keydown", handleInput);

    // remove event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleInput);
      post("/api/despawn", { userid: props.userId });
    };
  }, []);

  // update game periodically
  useEffect(() => {
    socket.on("update", (update) => {
      processUpdate(update);
    });
  }, []);

  const processUpdate = (update) => {
    // set winnerModal if update has defined winner
    if (update.winner) {
      setWinnerModal(
        <div className="Game-winner">the winner is {update.winner} yay cool cool</div>
      );
    } else {
      setWinnerModal(null);
    }
    drawCanvas(update, canvasRef);
  };

  // set a spawn button if the player is not in the game
  let spawnButton = null;
  if (props.userId) {
    spawnButton = (
      <div>
        <button
          onClick={() => {
            post("/api/spawn", { userid: props.userId });
          }}
        >
          Spawn
        </button>
      </div>
    );
  }

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
        {winnerModal}
        {spawnButton}
      </div>
    </>
  );
};

export default Game;
