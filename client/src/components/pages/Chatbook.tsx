import React, { useState, useEffect } from "react";
import ChatList from "../modules/ChatList";
import Chat from "../modules/Chat";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";

import "./Chatbook.css";

type User = {
  _id: string;
  name: string;
}

type Message = {
  sender: User;
  content: string;
}

type ChatData = {
  messages: Message[];
  recipient: User;
}

type ChatbookProps = {
  userId: string;
}

const ALL_CHAT : User = {
  _id: "ALL_CHAT",
  name: "ALL CHAT",
};

const Chatbook = (props: ChatbookProps) => {

  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [activeChat, setActiveChat] = useState<ChatData>({ recipient: ALL_CHAT, messages: [] });

  const loadMessageHistory = (recipient: User) => {
    get("/api/chat", { recipient_id: recipient._id }).then((messages: Message[]) => {
      setActiveChat({
        recipient: recipient,
        messages: messages,
      });
    });
  };

  useEffect(() => {
    document.title = "Chatbook";

    loadMessageHistory(ALL_CHAT);

    get("/api/activeUsers").then((data) => {
      // If user is logged in, we load their chats. If they are not logged in,
      // there's nothing to load. (Also prevents data races with socket event)
      if (props.userId) {
        setActiveUsers([ALL_CHAT, ...data.activeUsers]);
      }
    });

    socket.on("activeUsers", (data) => {
      setActiveUsers([ALL_CHAT, ...data.activeUsers]);
    });
  }, []);

  useEffect(() => {
    loadMessageHistory(activeChat.recipient);

    socket.on("message", (data) => {
      if (
        (data.recipient._id === activeChat.recipient._id && data.sender._id === props.userId) ||
        (data.sender._id === activeChat.recipient._id && data.recipient._id === props.userId) ||
        (data.recipient._id === "ALL_CHAT" && activeChat.recipient._id === "ALL_CHAT")
      ) {
        console.log(activeChat);
        console.log(data);
        setActiveChat({
          recipient: activeChat.recipient,
          messages: [...activeChat.messages, data],
        });
      }
    });

  }, [activeChat.recipient]);

  const setActiveUser = (user: User) => {
    loadMessageHistory(user);
  };

  if (!props.userId) return <div>Log in before using Chatbook</div>;

  return (
    <>
      <div className="u-flex u-relative Chatbook-container">
        <div className="Chatbook-userList">
          <ChatList
            setActiveUser={setActiveUser}
            userId={props.userId}
            users={activeUsers}
            active={activeChat.recipient}
          />
        </div>
        <div className="Chatbook-chatContainer u-relative">
          <Chat data={activeChat} />
        </div>
      </div>
    </>
  );
};

export {User, Message, ChatData, Chatbook};
