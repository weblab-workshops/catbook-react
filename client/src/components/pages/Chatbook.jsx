import React, { useContext, useEffect, useState } from "react";
import ChatList from "../modules/ChatList";
import Chat from "../modules/Chat";
import { socket } from "../../client-socket";
import { get } from "../../utilities";

import "./Chatbook.css";
import { UserContext } from "../context/UserContext";

// TODO (step 1.6): Add TEST_DATA, ALL_CHAT database object, and TEST_MESSAGES

const TEST_MESSAGES = [
  {
    sender: {
      _id: 0,
      name: "Kenneth",
    },
    content: "i love web lab",
  },
];

const Chatbook = () => {
  const userId = useContext(UserContext); // UserContext stores the ID of the currently logged in user
  const loadMessageHistory = (recipient) => {};

  useEffect(() => {
    document.title = "Chatbook";
  }, []);

  // TODO (step 1.5): populate chatbook (but use TEST_DATA)
  return <></>;
};

export default Chatbook;
