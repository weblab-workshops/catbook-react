import React, { Component } from "react";
import ChatList from "../modules/ChatList.js";
import Chat from "../modules/Chat.js";
import { socket } from "../../client-socket.js";

import "./Chatbook.css";

const ALL_CHAT = {
  _id: "ALL_CHAT",
  name: "ALL CHAT",
};

class Chatbook extends Component {
  //TODO: Change dummy data, remove comments, and hook up to backend
  /**
   * @typedef UserObject
   * @property {string} _id
   * @property {string} name
   */
  CORY = { _id: "5dbfd5ae53a5d86666e52364", name: "Cory Lynch" };
  AARON = { _id: "5dd36f5adee10d7dff6d37cc", name: "Aaron Sipser" };
  RACHEL = { _id: "5dd4c83f5fcc7b7882d3fa1a", name: "Rachel Zhang" };
  ALEX = { _id: "5dd43730dbf0d667c158eaa9", name: "Alex Chen" };
  // todo: possibly get from backend?
  USERS_ONLINE = [ALL_CHAT, this.RACHEL, this.ALEX, this.AARON, this.CORY];

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

  componentDidMount() {
    document.title = "Chatbook";
    // maybe get the chat here for ALL_CHAT
    socket.on("chat", (data) => {
      if (
        data.recipient._id === this.state.activeChat.recipient._id ||
        data.sender._id === this.state.activeChat.recipient._id
      ) {
        this.setState((prevstate) => ({
          activeChat: {
            recipient: prevstate.activeChat.recipient,
            messages: prevstate.activeChat.messages.concat(data),
          },
        }));
      }
    });
  }

  setActiveUser = (user) => {
    // maybe get chat here of the user? if we decide to
    this.setState({
      activeUsers: [],
      activeChat: {
        recipient: user,
        messages: [],
      },
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="u-flex u-relative Chatbook-container">
        <div className="Chatbook-userList">
          <ChatList
            setActiveUser={this.setActiveUser}
            users={this.USERS_ONLINE}
            active={this.state.activeChat.recipient}
          />
        </div>
        <div className="Chatbook-chatContainer u-relative">
          <Chat data={this.state.activeChat} />
        </div>
      </div>
    );
  }
}

export default Chatbook;
