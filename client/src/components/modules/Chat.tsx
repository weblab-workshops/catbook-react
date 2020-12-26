import React, { Component } from "react";
import SingleMessage from "./SingleMessage";
import { NewMessage } from "./NewPostInput";

import "./Chat.css";
import { ChatData } from "../pages/Chatbook";

/**
 * Renders main chat window including previous messages,
 * who is being chatted with, and the new message input.
 */

interface Props {
  data: ChatData;
}

class Chat extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="u-flexColumn Chat-container">
        <h3>Chatting with {this.props.data.recipient.name}</h3>
        <div className="Chat-historyContainer">
          {this.props.data.messages.map((m, i) => (
            <SingleMessage message={m} key={i} />
          ))}
        </div>
        <div className="Chat-newContainer">
          <NewMessage recipient={this.props.data.recipient} />
        </div>
      </div>
    );
  }
}

export default Chat;
