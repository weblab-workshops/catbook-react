import React from "react";
import { UserObject } from "../../types";

import "./SingleUser.css";

/**
 * Component to render an online user
 *
 * Proptypes
 * @param {(UserObject) => ()} setActiveUser function that takes in user,
 *  sets it to active
 * @param {UserObject} user
 * @param {boolean} active
 */

interface SingleUserProps {
  setActiveUser: (user: UserObject) => void;
  user: UserObject;
  active: boolean;
}

const SingleUser: React.FC<SingleUserProps> = (props) => {
  return (
    <div
      className={`SingleUser-container u-pointer ${props.active ?
        "SingleUser-container--active" : ""
        }`}
      onClick={() => {
        props.setActiveUser(props.user);
      }}
    >
      {props.user.name}
    </div>
  );
}

export default SingleUser;
