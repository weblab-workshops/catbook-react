import React, { useEffect, useState } from "react";
import ChatList from "../modules/ChatList.js";
import Chat from "../modules/Chat.js";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";

import "./Chatbook.css";

const ALL_CHAT = {
  _id: "ALL_CHAT",
  name: "ALL CHAT",
};

const TEST_MESSAGES = [
  {
    sender: {
      _id: 0,
      name: "Alex",
    },
    content: "i love aaron sippy cup",
  },
  {
    sender: {
      _id: 0,
      name: "Nik",
    },
    content: "i spend too much time on piazza",
  },
];

const Chatbook = (props) => {
  /**
   * @typedef UserObject
   * @property {string} _id
   * @property {string} name
   */
  /**
   * @typedef MessageObject
   * @property {UserObject} sender
   * @property {string} content
   */
  /**
   * @typedef ChatData
   * @property {MessageObject[]} messages
   * @property {UserObject} recipient
   */

  const [activeChat, setActiveChat] = useState({
    recipient: ALL_CHAT,
    messages: TEST_MESSAGES,
  });

  const loadMessageHistory = (recipient) => {
    // This function loads the messages by getting them from the server
    // TODO (step 5.1): get /api/chat and set the activeChat
  };

  useEffect(() => {
    document.title = "Chatbook";
  }, []);

  useEffect(() => {
    // TODO (step 5.2): call this.loadMessageHistory()
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
}

export default Chatbook;
