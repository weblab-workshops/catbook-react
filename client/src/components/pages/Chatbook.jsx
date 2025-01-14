import React, { useEffect, useState } from "react";
import ChatList from "../modules/ChatList";
import Chat from "../modules/Chat";
import { socket } from "../../client-socket";
import { get } from "../../utilities";
import { useOutletContext } from "react-router-dom";

import "./Chatbook.css";

const ALL_CHAT = {
  _id: "ALL_CHAT",
  name: "ALL CHAT",
};

const Chatbook = () => {

  const [activeUsers, setActiveUsers] = useState([]);
  let props = useOutletContext();

  const [activeChat, setActiveChat] = useState({
    recipient: ALL_CHAT,
    messages: [],
  });

  const loadMessageHistory = (recipient) => {
    get("/api/chat", { recipient_id: recipient._id }).then((messages) => {
      setActiveChat({
        recipient: recipient,
        messages: messages,
      });
    });
  };

  const addMessage = (data) => {
    setActiveChat(prevActiveChat => ({
      recipient: prevActiveChat.recipient,
      messages: prevActiveChat.messages.concat(data),
    }));
  };

  useEffect(() => {
    document.title = "Chatbook";
  }, []);

  useEffect(() => {
    loadMessageHistory(ALL_CHAT);
  }, []);

  useEffect(() => {
    socket.on("message", addMessage);
    return () => {
      socket.off("message", addMessage);
    };
  }, []);

  const setActiveUser = (user) => {
    console.log(`setting active user to ${user.name}`);
  };

  if (!props.userId) {
    return <div>Log in before using Chatbook</div>;
  }
  return (
    <>
      <div className="u-flex u-relative Chatbook-container">
        <div className="Chatbook-userList">
          {/* TODO (step 3.1): Add ChatList component and pass in the props:
                   users, active, userId, and setActiveUser.
                   These four props are described in ChatList.js  */}
        </div>
        <div className="Chatbook-chatContainer u-relative">
          <Chat data={activeChat} />
        </div>
      </div>
    </>
  );
}

export default Chatbook;
