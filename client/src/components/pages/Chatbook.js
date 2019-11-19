import React, { Component } from "react";
import ChatList from "../modules/ChatList.js";
import Chat from "../modules/Chat.js";

import "./Chatbook.css";

class Chatbook extends Component {
  constructor(props) {
    super(props);
  }

  //TODO: Change dummy data, remove comments, and hook up to backend
  /**
   * @typedef UserObject
   * @property {string} _id
   * @property {string} name
   */
  SHANNEN = { _id: "1", name: "Shannen Wu" };
  AARON = { _id: "2", name: "Aaron Sipser" };
  USERS_ONLINE = [this.SHANNEN, this.AARON];

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
  ACTIVE_CHAT = {
    recipient: this.AARON,
    messages: [
      { sender: this.SHANNEN, content: "hiyo" },
      { sender: this.AARON, content: "hey" },
      { sender: this.AARON, content: "whatsup" },
      {
        sender: this.SHANNEN,
        content:
          "do you think this styling handles content with super long messages? like really really really really really long messages",
      },
    ],
  };

  componentDidMount() {
    document.title = "Chatbook";
  }

  render() {
    return (
      <div className="u-flex u-relative Chatbook-container">
        <div className="Chatbook-userList">
          <ChatList users={this.USERS_ONLINE} active={this.AARON} />
        </div>
        <div className="Chatbook-chatContainer u-relative">
          <Chat data={this.ACTIVE_CHAT} />
        </div>
      </div>
    );
  }
}

export default Chatbook;
