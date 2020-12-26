import React, { Component } from "react";
import { User } from "../pages/Chatbook";
import SingleUser from "./SingleUser";

import "./SingleUser.css";

/**
 * List of users that are online to chat with and all chat
 */

interface Props {
  users: User[];
  userId: string;
  setActiveUser: (user: User) => void;
  activeUser: User;
}

class ChatList extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <h3>Open Chats</h3>
        {this.props.users
          .filter((user) => user._id !== this.props.userId)
          .map((user, i) => (
            <SingleUser
              key={i}
              setActiveUser={this.props.setActiveUser}
              user={user}
              active={user === this.props.activeUser}
            />
          ))}
      </>
    );
  }
}

export default ChatList;
