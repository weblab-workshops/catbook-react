import React, { Component } from "react";
import ChatList from "../modules/ChatList.js";
import Modal from "../modules/Modal.js";
import Chat from "../modules/Chat.js";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";

import "./Chatbook.css";

const ALL_CHAT = {
  _id: "ALL_CHAT",
  name: "ALL CHAT",
};

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

    get("/api/activeUsers").then((data) => {
      this.setState({
        activeUsers: [ALL_CHAT].concat(data.activeUsers),
      });
    });

    socket.on("message", (data) => {
      // TODO (step 7)
      this.setState((prevstate) => ({
        activeChat: {
          recipient: prevstate.activeChat.recipient,
          messages: prevstate.activeChat.messages.concat(data),
        },
      }));
    });

    // TODO (step 4): add a socket on that listens for the "activeUsers" event. Once we
    // hear the event, update the state with the new active user who just joined
    // similar to get("/api/activeUsers")!
  }

  setActiveUser = (user) => {
    // TODO (step 5): first load the message history for this user, then set the
    // state "activeChat" to the new recipient (user) and empty array forr messages
    console.log(`setting active user to ${user.name}`);
  };

  render() {
    if (!this.props.userId) return <div>Log in before using Chatbook</div>;

    return (
      <>
        {/* TODO (step 8) */}
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
