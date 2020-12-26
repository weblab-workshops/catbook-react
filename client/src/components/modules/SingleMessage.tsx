import React, { Component } from "react";
import { Message } from "../pages/Chatbook";

import "./SingleMessage.css";

/**
 * Renders a single chat message
 */

interface Props {
  message: Message;
}

class SingleMessage extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="u-flex u-flex-alignCenter SingleMessage-container">
        <span className=" SingleMessage-sender u-bold">{this.props.message.sender.name + ":"}</span>
        <span className="SingleMessage-content">{this.props.message.content}</span>
      </div>
    );
  }
}

export default SingleMessage;
