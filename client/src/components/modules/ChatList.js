import React, { useState, useEffect } from "react";
import SingleUser from "./SingleUser.js";

import "./SingleUser.css";

/**
 * List of users that are online to chat with and all chat
 *
 * Proptypes
 * @param {UserObject[]} users to display
 * @param {UserObject} active user in chat
 * @param {string} userId id of current logged in user
 * @param {(UserObject) => ()} setActiveUser function that takes in user, sets it to active
 */
const ChatList = (props) => {
  return (
    <>
      <h3>Open Chats</h3>
      {props.users
        .map((user, i) => (
          <SingleUser
            key={i}
            setActiveUser={props.setActiveUser}
            user={user}
            active={user === props.active}
          />
        ))}
    </>
  );
}

export default ChatList;
