import React, { Component } from "react";
import { NewChat } from "../modules/NewPostInput.js";

import "./Chatbook.css";

//TODO: Break components out into different files?

/**
 * @param {UserObject} user
 * @param {boolean} active
 */
class SingleUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={`SingleUser-container u-pointer ${this.props.active &&
          "SingleUser-container--active"}`}
      >
        {this.props.user.name}
      </div>
    );
  }
}

/**
 * @param {UserObject[]} users to display
 * @param {UserObject} active user in chat
 */
class ChatList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h3>Open Chats</h3>
        <div className="SingleUser-container u-pointer">All Chat</div>
        {this.props.users.map((user) => (
          <SingleUser user={user} active={user === this.props.active} />
        ))}
      </>
    );
  }
}

/**
 * @param {MessageObject} message
 * @param {boolean} showSender
 */
class SingleChat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={`u-flex u-flex-alignCenter SingleChat-container ${this.props.message.sender
          ._id === "1" && "SingleChat-mine"}`}
      >
        <span className=" SingleChat-sender u-bold">
          {this.props.showSender && this.props.message.sender.name + ":"}
        </span>
        <span className="SingleChat-content">{this.props.message.content}</span>
      </div>
    );
  }
}

/**
 * @param {ChatData} data
 */
class Chat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="u-flexColumn Chat-container">
        <h3>Chatting with {this.props.data.recipient.name}</h3>
        <div className="Chat-historyContainer">
          {this.props.data.messages.map((m, i) => (
            <SingleChat
              message={m}
              showSender={i === 0 || m.sender !== this.props.data.messages[i - 1].sender}
            />
          ))}
        </div>
        <div className="Chat-newContainer">
          <NewChat />
        </div>
      </div>
    );
  }
}

class Chatbook extends Component {
  constructor(props) {
    super(props);
  }

  //TODO: Change dummy data
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
