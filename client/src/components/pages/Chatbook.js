import React, { useState, useEffect } from "react";
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
      name: "Michael",
    },
    content: "i love web lab",
  },
  {
    sender: {
      _id: 0,
      name: "Kenneth",
    },
    content: "me too",
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

  // TODO (step 2.1): add state activeChat, an object with two fields:
  // recipient, and messages!
  // In this object, initialize recipient to ALL_CHAT, and messages to TEST_MESSAGES

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
