import React, { Component } from "react";
import SingleUser from "./SingleUser.js";

import "./SingleUser.css";

/**
 * List of users that are online to chat with and all chat
 *
 * Proptypes
 * @param {UserObject[]} users to display
 * @param {UserObject} active user in chat
 * @param {UserObject} user current logged in user
 * @param {(UserObject) => ()} setActiveUser function that takes in user, sets it to active
 */
class ChatList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // TODO (starter)
    return <></>;
  }
}

export default ChatList;
