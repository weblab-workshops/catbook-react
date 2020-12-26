import React, { Component } from "react";
import { User } from "../pages/Chatbook";

import "./SingleUser.css";

/**
 * Component to render an online user
 */

interface Props {
  user: User;
  active: boolean;
  setActiveUser: (user: User) => void;
}

class SingleUser extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={`SingleUser-container u-pointer ${
          this.props.active ? "SingleUser-container--active" : ""
        }`}
        onClick={() => {
          this.props.setActiveUser(this.props.user);
        }}
      >
        {this.props.user.name}
      </div>
    );
  }
}

export default SingleUser;
