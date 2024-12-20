import React, { useEffect, useState } from "react";
import ChatList from "../modules/ChatList";
import Chat from "../modules/Chat";
import { socket } from "../../client-socket";
import { get } from "../../utilities";
import { useOutletContext } from "react-router-dom";

import "./Chatbook.css";

// TODO (step 1.6): Add TEST_DATA, ALL_CHAT database object, and TEST_MESSAGES
const ALL_CHAT = {
  _id: "ALL_CHAT",
  name: "ALL CHAT",
};

const Chatbook = () => {
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

  let props = useOutletContext();

  const loadMessageHistory = (recipient) => {
  };

  useEffect(() => {
    document.title = "Chatbook";
  }, []);

  // TODO (step 1.5): populate chatbook (but use TEST_DATA)
  return <></>;
}

export default Chatbook;
