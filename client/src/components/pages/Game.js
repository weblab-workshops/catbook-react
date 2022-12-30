import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";

import "../../utilities.css";

const Game = (props) => {
  useEffect(() => {
    document.title = "Game Page";
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);

  if (!user) {
    return <div> Loading! </div>;
  }
  return (
    <>
      <div className="body">Test</div>
    </>
  );
};

export default Game;
