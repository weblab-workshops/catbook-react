import React, { useState, useEffect, useRef, JSX } from "react";
import { socket } from "../../client-socket";
import { get, post } from "../../utilities";
import { drawCanvas, GameState } from "../../canvasManager";
import { handleInput } from "../../input";
import { useOutletContext } from "react-router-dom";

import "../../utilities.css";
import "./Game.css";

interface GameProps {
  userId: string;
}

const Game: React.FC = () => {
  let props = useOutletContext<GameProps>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [winnerModal, setWinnerModal] = useState<JSX.Element | null>(null);

  // Add event listener on mount
  useEffect(() => {
    window.addEventListener("keydown", handleInput);

    // Remove event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleInput);
      post("/api/despawn", { userid: props.userId });
    };
  }, []);

  // Update game periodically
  useEffect(() => {
    socket.on("update", (update: GameState) => {
      processUpdate(update);
    });
    return () => {
      socket.off("update");
    };
  }, []);

  const processUpdate = (update: GameState) => {
    // Set winnerModal if update has defined winner
    if (update.winner) {
      setWinnerModal(
        <div className="Game-winner">The winner is {update.winner}! Yay, cool cool!</div>
      );
    } else {
      setWinnerModal(null);
    }
    if (canvasRef.current) {
      drawCanvas(update, canvasRef.current);
    }
  };

  // Set a spawn button if the player is not in the game
  let spawnButton: JSX.Element | null = null;
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

  // Display text if the player is not logged in
  let loginModal: JSX.Element | null = null;
  if (!props.userId) {
    loginModal = <div>Please Login First!</div>;
  }

  return (
    <>
      <div>
        {/* Important: canvas needs ref to be referenced by canvasManager */}
        <canvas ref={canvasRef} width="500" height="500" />
        {loginModal}
        {winnerModal}
        {spawnButton}
      </div>
    </>
  );
};

export default Game;
