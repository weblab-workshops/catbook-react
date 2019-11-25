import React, { Component } from "react";

import "./SingleUser.css";

/**
 * Component to render an online user
 *
 * Proptypes
 * @param {UserObject} user
 * @param {boolean} active
 */
class SingleUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={`SingleUser-container u-pointer ${this.props.active &&
          "SingleUser-container--active"}`}
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
