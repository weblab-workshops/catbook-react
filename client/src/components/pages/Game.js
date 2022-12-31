import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";
import { drawCanvas } from "../../canvasManager";
import { handleInput } from "../../input";

import "../../utilities.css";
import "./Game.css";

const Game = (props) => {
  const [winner, setWinner] = useState(null);
  let inGame = false;

  // get user info
  useEffect(() => {
    document.title = "Game Page";
  }, []);

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

      if (!(props.userId in update.players)) {
        inGame = false;
      }
    });
  }, []);

  const processUpdate = (update) => {
    if (update.winner) {
      setWinner(update.winner);
    }
    drawCanvas(update);
  };

  // set a winner modal if there is a winner
  let winnerModal = null;
  if (winner) {
    winnerModal = <div className="Game-winner">the winner is {winner} yay cool cool</div>;
  }

  // set a spawn modal if the player is not in the game
  let spawnButton = null;
  if (!inGame && props.userId) {
    spawnButton = (
      <div className="Game-spawn">
        <button
          onClick={() => {
            get("/api/spawn", { userid: props.userId }).then(() => {
              inGame = true;
            });
          }}
        >
          Spawn
        </button>
      </div>
    );
  }

  let loginModal = null;
  if (!props.userId) {
    loginModal = <div> Please Login First! </div>;
  }

  return (
    <>
      <div>
        <canvas id="game-canvas" width="500" height="500" />
        {loginModal}
        {winnerModal}
        {spawnButton}
      </div>
    </>
  );
};

export default Game;
