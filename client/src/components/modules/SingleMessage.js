import React, { Component } from "react";

import "./SingleMessage.css";

/**
 * Renders a single chat message
 *
 * Proptypes
 * @param {MessageObject} message
 * @param {boolean} showSender
 */
class SingleMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"u-flex u-flex-alignCenter SingleMessage-container"}>
        <span className=" SingleMessage-sender u-bold">{this.props.message.sender.name + ":"}</span>
        <span className="SingleMessage-content">{this.props.message.content}</span>
      </div>
    );
  }
}

export default SingleMessage;
