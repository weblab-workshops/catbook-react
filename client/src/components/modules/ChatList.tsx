import React from "react";
import SingleUser from "./SingleUser";
import {User} from "../pages/Chatbook";

import "./SingleUser.css";

type ChatListProps = {
  users: User[];
  userId: string;
  setActiveUser: (user: User) => void;
  active: User;
}

const ChatList = (props: ChatListProps) => {
  return (
    <>
      <h3>Open Chats</h3>
      {props.users.map((user, i) => (
        <SingleUser
          key={i}
          setActiveUser={props.setActiveUser}
          user={user}
          active={user === props.active}
        />
      ))}
    </>
  );
};

export default ChatList;
