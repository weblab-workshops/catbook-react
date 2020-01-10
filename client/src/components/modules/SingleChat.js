import React, { Component } from "react";

import "./SingleChat.css";

/**
 * Renders a single chat message
 *
 * Proptypes
 * @param {MessageObject} message
 * @param {boolean} showSender
 */
class SingleChat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"u-flex u-flex-alignCenter SingleChat-container"}>
        <span className=" SingleChat-sender u-bold">{this.props.message.sender.name + ":"}</span>
        <span className="SingleChat-content">{this.props.message.content}</span>
      </div>
    );
  }
}

export default SingleChat;
