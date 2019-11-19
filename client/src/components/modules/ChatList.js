import React, { Component } from "react";
import SingleUser from "./SingleUser.js";

import "./SingleUser.css";

/**
 * List of users that are online to chat with and all chat
 *
 * Proptypes
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

export default ChatList;
