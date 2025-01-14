import React, { useContext, useEffect, useState } from "react";
import ChatList from "../modules/ChatList";
import Chat from "../modules/Chat";
import { socket } from "../../client-socket";
import { get } from "../../utilities";

import "./Chatbook.css";
import { UserContext } from "../context/UserContext";

const ALL_CHAT = {
  _id: "ALL_CHAT",
  name: "ALL CHAT",
};

const TEST_MESSAGES = [
  {
    sender: {
      _id: 0,
      name: "Abby",
    },
    content: "tell me why",
  },
  {
    sender: {
      _id: 0,
      name: "Abby",
    },
    content: "aint nothin but a heartache",
  },
  {
    sender: {
      _id: 0,
      name: "Abby",
    },
    content: "tElL mE whYyY",
  },
];

const Chatbook = () => {

  // TODO (step 2.1): add state activeChat, an object with two fields:
  // recipient, and messages!
  // In this object, initialize recipient to ALL_CHAT, and messages to TEST_MESSAGES
  const userId = useContext(UserContext); // UserContext stores the ID of the currently logged in user
  const loadMessageHistory = (recipient) => {};

  useEffect(() => {
    document.title = "Chatbook";
  }, []);

  if (!userId) {
    return <div>Log in before using Chatbook</div>;
  }

  return (
    <>
      <div className="u-flex u-relative Chatbook-container">
        <div className="Chatbook-chatContainer u-relative">
          {/* TODO (step 2.2): change data to use our activeChat state */}
          <Chat
            data={{
              recipient: ALL_CHAT,
              messages: TEST_MESSAGES,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Chatbook;
