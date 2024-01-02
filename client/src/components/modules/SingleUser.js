import React, { useState, useEffect } from "react";

import "./SingleUser.css";

/**
 * Component to render an online user
 *
 * Proptypes
 * @param {(UserObject) => ()} setActiveUser function that takes in user, sets it to active
 * @param {UserObject} user
 * @param {boolean} active
 */
const SingleUser = (props) => {
  // TODO (step 2.1) render single user in chat list
  return (
    <div
      className={`SingleUser-container u-pointer ${props.active ?
        "SingleUser-container--active" : ""
        }`}
      onClick={() => {
        // TODO (step 2.1.1) change the user on click
      }}
    >
    </div>
  );
}

export default SingleUser;
