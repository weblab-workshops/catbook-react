import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";
import { drawCanvas } from "../../canvasManager";
import { handleInput } from "../../input";

import "../../utilities.css";
import "./Game.css";

const Game = (props) => {
  const [user, setUser] = useState();
  const [winner, setWinner] = useState(null);

  // get user info
  useEffect(() => {
    document.title = "Game Page";
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);

  if (!user) {
    return <div> Loading! </div>;
  }

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

  return (
    <>
      <div className="Game-body">
        <canvas id="game-canvas" width="800" height="800" />
        {winnerModal}
      </div>
    </>
  );
};

export default Game;
