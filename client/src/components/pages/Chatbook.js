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
      // TODO (starter)
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

    // TODO (step 3)

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

  // TODO (starter)

  render() {
    if (!this.props.userId) return <div>Log in before using Chatbook</div>;

    return (
      <>
        <div className="u-flex u-relative Chatbook-container">
          <div className="Chatbook-userList">
            {/* TODO (step 1): Add ChatList component and pass in props setActiveUser,
            userId, users, and active. */}
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
