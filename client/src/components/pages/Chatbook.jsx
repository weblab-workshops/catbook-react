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
const userId = useContext(UserContext);
  const [activeChat, setActiveChat] = useState({
    recipient: ALL_CHAT,
    messages: TEST_MESSAGES,
  });

  const loadMessageHistory = (recipient) => {
    get("/api/chat", { recipient_id: recipient._id }).then((messages) => {
      setActiveChat({
        recipient: recipient,
        messages: messages,
      })
    })
  };

  useEffect(() => {
    document.title = "Chatbook";
  }, []);

  useEffect(() => {
    loadMessageHistory(activeChat.recipient);
  }, []);

  if (!userId) {
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
