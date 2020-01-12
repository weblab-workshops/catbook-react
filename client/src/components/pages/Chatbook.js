import React, { Component } from "react";
import ChatList from "../modules/ChatList.js";
import Modal from "../modules/Modal.js";
import Chat from "../modules/Chat.js";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";

import "./Chatbook.css";

class Chatbook extends Component {
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

  constructor(props) {
    super(props);
    // TODO (step 1): add state activeChat , an object with two fields:
    // recipient, and messages!
    // initialize recipient to ALL_CHAT
  }

  loadMessageHistory(recipient) {
    // This function loads the messages by getting them from the server
    // TODO (step 4): get /api/chat and set the activeChat
  }

  componentDidMount() {
    document.title = "Chatbook";

    // TODO (step 4): call this.loadMessageHistory()

    // TODO (step 5): add socket.on for when received message
  }

  render() {
    // TODO (starter): populate chatbook
    return <></>;
  }
}

export default Chatbook;
