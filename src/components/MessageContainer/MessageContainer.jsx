import React from "react";
import {
  MessageList,
  MessageItem,
  ProfileImage,
  MessageText,
} from "./MessageContainer.styles.jsx";
import profileImg from "../../assets/profile.jpeg";

const MessageContainer = ({ messages = [], user }) => {
  // 메시지가 없으면 아무것도 렌더링하지 않음
  if (!Array.isArray(messages) || messages.length === 0) {
    return null;
  }

  return (
    <MessageList>
      {messages.map((message, index) => {
        const messageUser = message.user || {};
        const isMyMessage = messageUser._id === user._id;

        return (
          <MessageItem key={index}>
            <ProfileImage src={profileImg} alt="Profile" />
            <MessageText $isMyMessage={isMyMessage}>
              <strong>{messageUser.name || "Unknown"}: </strong>
              {message.text || ""}
            </MessageText>
          </MessageItem>
        );
      })}
    </MessageList>
  );
};

export default MessageContainer;
