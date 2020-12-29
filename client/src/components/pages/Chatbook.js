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

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */
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
    this.state = {
      activeUsers: [],
      activeChat: {
        recipient: ALL_CHAT,
        messages: [],
      },
    };
  }

  loadMessageHistory(recipient) {
    get("/api/chat", { recipient_id: recipient._id }).then((messages) => {
      this.setState({
        activeChat: {
          recipient: recipient,
          messages: messages,
        },
      });
    });
  }

  componentDidMount() {
    document.title = "Chatbook";

    this.loadMessageHistory(ALL_CHAT);

    if(this.props.userId) {
      // If user is logged in, we load their chats. If they are not
      // logged in, there's nothing to load
      get("/api/activeUsers").then((data) => {
        this.setState({
          activeUsers: [ALL_CHAT].concat(data.activeUsers),
        });
      });
    }

    socket.on("message", (data) => {
      this.setState((prevstate) => ({
        activeChat: {
          recipient: prevstate.activeChat.recipient,
          messages: prevstate.activeChat.messages.concat(data),
        },
      }));
    });

    socket.on("activeUsers", (data) => {
      this.setState({
        activeUsers: [ALL_CHAT].concat(data.activeUsers),
      });
    });
  }

  setActiveUser = (user) => {
    this.loadMessageHistory(user);
    this.setState({
      activeChat: {
        recipient: user,
        messages: [],
      },
    });
  };

  render() {
    if (!this.props.userId) return <div>Log in before using Chatbook</div>;

    return (
      <>
        <div className="u-flex u-relative Chatbook-container">
          <div className="Chatbook-userList">
            <ChatList
              setActiveUser={this.setActiveUser}
              userId={this.props.userId}
              users={this.state.activeUsers}
              active={this.state.activeChat.recipient}
            />
          </div>
          <div className="Chatbook-chatContainer u-relative">
            <Chat data={this.state.activeChat} />
          </div>
        </div>
      </>
    );
  }
}

export default Chatbook;
