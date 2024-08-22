import React, { useEffect, useRef } from "react";
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

  const messageListRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <MessageList ref={messageListRef}>
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
      {currentMessages.map((currentMessage, index) => {
        // 유효하지 않은 메시지를 필터링
        if (!currentMessage || !currentMessage.text || !currentMessage.user) {
          return null;
        }
        const isMyMessage = currentMessage.user._id === user._id;

        return (
          <MessageItem key={`curr-${index}`} $isMyMessage={isMyMessage}>
            {currentMessage.user._id !== user._id && (
              <ProfileImage src={profileImg} alt="Profile" />
            )}
            <MessageText $isMyMessage={isMyMessage}>
              <strong>{currentMessage.user?.name || "Unknown"}: </strong>
              {currentMessage.text}
            </MessageText>
          </MessageItem>
        );
      })}
    </MessageList>
  );
};

export default MessageContainer;
