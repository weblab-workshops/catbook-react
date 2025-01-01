import React from "react";
import SingleUser from "./SingleUser";

import "./SingleUser.css";

interface UserObject {
  _id: string;
  name: string;
}

interface ChatListProps {
  users: UserObject[];
  active: UserObject;
  userId: string;
  setActiveUser: (user: UserObject) => void;
}

const ChatList: React.FC<ChatListProps> = (props) => {
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
