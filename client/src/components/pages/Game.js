import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";
import { drawCanvas } from "../../canvasManager";
import { handleInput } from "../../input";

import "../../utilities.css";
import "./Game.css";

const Game = (props) => {
  // TODO (Step 6.5): initialize winner state
  // Uncomment the following code:
  // const [winner, setWinner] = useState(null);

  // add event listener on mount
  useEffect(() => {
    window.addEventListener("keydown", handleInput);

    // remove event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleInput);
      // TODO (Step 6.4): send a post request with user id to despawn api (1 line)
    };
  }, []);

  // update game periodically
  useEffect(() => {
    socket.on("update", (update) => {
      processUpdate(update);
    });
  }, []);

  const processUpdate = (update) => {
    // TODO (Step 6.5): set winner state if update has defined winner
    // Uncomment the following code:
    // if (update.winner) {
    //   setWinner(update.winner);
    // }
    drawCanvas(update);
  };

  let winnerModal = null;
  // TODO (Step 6.5): set winner modal if there is a winner
  // Uncomment the following code:
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
            // TODO (Step 6.3): send a post request with user id to spawn api (1 line)
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
