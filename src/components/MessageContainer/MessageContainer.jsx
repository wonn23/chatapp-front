import React from "react";
import {
  MessageList,
  MessageItem,
  ProfileImage,
  MessageText,
} from "./MessageContainer.styles.jsx";
import profileImg from "../../assets/profile.jpeg";

const MessageContainer = ({ messages = [], user }) => {
  // 이전 대화내용이 첫번째 항목에 있는지 확인
  const previousMessages = Array.isArray(messages[0]) ? messages[0] : [];
  const currentMessages = Array.isArray(messages[0])
    ? messages.slice(1)
    : messages;

  return (
    <MessageList>
      {/* 이전 대화내용 렌더링 */}
      {previousMessages.map((prevMessage, index) => (
        <MessageItem
          key={`prev-${index}`}
          $isMyMessage={prevMessage.user._id === user._id}
        >
          {prevMessage.user._id !== user._id && (
            <ProfileImage src={profileImg} alt="Profile" />
          )}
          <MessageText $isMyMessage={prevMessage.user._id === user._id}>
            <strong>{prevMessage.user?.name || "Unknown"}: </strong>
            {prevMessage.text || ""}
          </MessageText>
        </MessageItem>
      ))}

      {/* 현재 대화내용 렌더링 */}
      {currentMessages.map((message, index) => {
        // 유효하지 않은 메시지를 필터링
        if (!message || !message.text || !message.user) {
          return null;
        }

        const isMyMessage = message.user._id === user._id;

        return (
          <MessageItem key={`curr-${index}`} $isMyMessage={isMyMessage}>
            {message.user._id !== user._id && (
              <ProfileImage src={profileImg} alt="Profile" />
            )}
            <MessageText $isMyMessage={isMyMessage}>
              <strong>{message.user?.name || "Unknown"}: </strong>
              {message.text}
            </MessageText>
          </MessageItem>
        );
      })}
    </MessageList>
  );
};

export default MessageContainer;
