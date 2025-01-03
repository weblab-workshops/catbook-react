import React, { useEffect, useState } from "react";
import ChatList from "../modules/ChatList";
import Chat from "../modules/Chat";
import { socket } from "../../client-socket";
import { get } from "../../utilities";
import { useOutletContext } from "react-router-dom";

import "./Chatbook.css";

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

  const [activeChat, setActiveChat] = useState({
    recipient: ALL_CHAT,
    messages: TEST_MESSAGES,
  });

  const loadMessageHistory = (recipient) => {};

  useEffect(() => {
    document.title = "Chatbook";
  }, []);

  if (!props.userId) {
    return <div>Log in before using Chatbook</div>;
  }

  return (
    <>
      <div className="u-flex u-relative Chatbook-container">
        <div className="Chatbook-chatContainer u-relative">
          <Chat data={activeChat} />
        </div>
      </div>
    </>
  );
};

export default Chatbook;
