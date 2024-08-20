import React from "react";
import styled from "styled-components";
import profileImg from "../../assets/profile.jpeg";

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const MessageItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const MessageText = styled.div`
  background-color: ${({ $isMyMessage }) =>
    $isMyMessage ? "#f7e600" : "#eee"};
  padding: 10px;
  border-radius: 8px;
  max-width: 60%;
`;

const MessageContainer = ({ messages = [], user }) => {
  if (!Array.isArray(messages) || messages.length === 0) {
    return null;
  }

  return (
    <MessageList>
      {messages.map((message, index) => {
        const userExists = message.user && message.user.name;
        const profilePicture =
          userExists && message.user.profilePicture
            ? message.user.profilePicture
            : profileImg;

        return (
          <MessageItem key={index}>
            <ProfileImage src={profilePicture} alt="Profile" />
            <MessageText
              $isMyMessage={userExists && message.user._id === user._id}
            >
              <strong>
                {userExists ? message.user.name : "Unknown User"}:{" "}
              </strong>
              {message.text}
            </MessageText>
          </MessageItem>
        );
      })}
    </MessageList>
  );
};

export default MessageContainer;
