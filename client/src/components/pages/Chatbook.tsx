import React, { Component } from "react";
import ChatList from "../modules/ChatList";
import Chat from "../modules/Chat";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";

import "./Chatbook.css";

const ALL_CHAT: User = {
  _id: "ALL_CHAT",
  name: "ALL CHAT",
};

// Defined types here, can also be moved to a separate types file.
export interface User {
  _id: string;
  name: string;
}

export interface Message {
  sender: User;
  content: string;
}

export interface ChatData {
  messages: Message[];
  recipient: User;
}

interface Props {
  userId: string;
}

interface State {
  activeUsers: User[];
  activeChat: {
    recipient: User;
    messages: Message[];
  };
}

class Chatbook extends Component<Props, State> {
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

  loadMessageHistory(recipient: User) {
    get("/api/chat", { recipient_id: recipient._id }).then((messages: Message[]) => {
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
      if (
        (data.recipient._id === this.state.activeChat.recipient._id &&
          data.sender._id === this.props.userId) ||
        (data.sender._id === this.state.activeChat.recipient._id &&
          data.recipient._id === this.props.userId) ||
        (data.recipient._id === "ALL_CHAT" && this.state.activeChat.recipient._id === "ALL_CHAT")
      ) {
        this.setState((prevstate) => ({
          activeChat: {
            recipient: prevstate.activeChat.recipient,
            messages: prevstate.activeChat.messages.concat(data),
          },
        }));
      }
    });
    socket.on("activeUsers", (data) => {
      this.setState({
        activeUsers: [ALL_CHAT].concat(data.activeUsers),
      });
    });
  }

  setActiveUser = (user: User) => {
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
              activeUser={this.state.activeChat.recipient}
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
