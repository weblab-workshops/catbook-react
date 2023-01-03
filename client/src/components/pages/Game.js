import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";
import { drawCanvas } from "../../canvasManager";
import { handleInput } from "../../input";

import "../../utilities.css";
import "./Game.css";

const Game = (props) => {
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
    console.log(update.winner);
    if (update.winner) {
      setWinnerModal(
        <div className="Game-winner">the winner is {update.winner} yay cool cool</div>
      );
      setTimeout(() => {
        setWinnerModal(null);
      }, 5000);
    }
    drawCanvas(update);
  };

  // set a winner modal if there is a winner
  // let winnerModal = null;
  // if (winner) {
  //   winnerModal = <div className="Game-winner">the winner is {winner} yay cool cool</div>;
  // }

  // set a spawn button if the player is not in the game
  let spawnButton = null;
  if (props.userId) {
    spawnButton = (
      <div className="Game-spawn">
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
        <canvas id="game-canvas" width="500" height="500" />
        {loginModal}
        {winnerModal}
        {spawnButton}
      </div>
    </>
  );
};

export default Game;
