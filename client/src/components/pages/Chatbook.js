import React, { Component } from "react";
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
    // TODO (step 2.2): add state activeChat , an object with two fields:
    // recipient, and messages!
    // initialize recipient to ALL_CHAT
  }

  loadMessageHistory(recipient) {
  }

  componentDidMount() {
    document.title = "Chatbook";
  }

  render() {
    if (!this.props.userId) return <div>Log in before using Chatbook</div>;

    return (
      <>
        <div className="u-flex u-relative Chatbook-container">
          <div className="Chatbook-chatContainer u-relative">
            {/* TODO (step 2.1): change to state instead of hard coded */}
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
  }
}

export default Chatbook;
