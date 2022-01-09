import React, { useEffect } from "react";
import ChatList from "../modules/ChatList.js";
import Chat from "../modules/Chat.js";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";

import "./Chatbook.css";

// TODO (step 1.6): Add TEST_DATA, ALL_CHAT database object, and TEST_MESSAGES
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

  const loadMessageHistory = (recipient) => {
  };

  useEffect(() => {
    document.title = "Chatbook";
  }, []);

  // TODO (step 1.5): populate chatbook (but use TEST_DATA)
  return <></>;
}

export default Chatbook;
