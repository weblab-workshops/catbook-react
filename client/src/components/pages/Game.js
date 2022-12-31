import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";
import { drawCanvas } from "../../canvasManager";
import { handleInput } from "../../input";
// const gameLogic = require("../../../../../server/game-logic.js");

import "../../utilities.css";
import "./Game.css";

const Game = (props) => {
  const [winner, setWinner] = useState(null);

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
  let spawnModal = null;
  // if (!gameLogic.playerInGame()) {
  //   spawnModal = (
  //     <div className="Game-spawn">
  //       <button onClick={() => {}}>Spawn</button>
  //     </div>
  //   );
  // }

  let loginModal = null;
  if (!props.userId) {
    loginModal = <div> Please Login First! </div>;
  }

  return (
    <>
      <div className="Game-body">
        <canvas id="game-canvas" width="400" height="400" />
        {loginModal}
        {winnerModal}
        {spawnModal}
      </div>
    </>
  );
};

export default Game;
