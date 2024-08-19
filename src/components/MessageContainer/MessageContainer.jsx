import React from "react";
import {
  SystemMessageContainer,
  SystemMessage,
  MyMessageContainer,
  MyMessage,
  YourMessageContainer,
  YourMessage,
  ProfileImage,
} from "./MessageContainer.styles";

const MessageContainer = ({ messageList, user }) => {
  return (
    <div>
      {messageList.map((message, index) => (
        <div key={message._id}>
          {message.user.name === "system" ? (
            <SystemMessageContainer>
              <SystemMessage>{message.chat}</SystemMessage>
            </SystemMessageContainer>
          ) : message.user.name === user.name ? (
            <MyMessageContainer>
              <MyMessage>{message.chat}</MyMessage>
            </MyMessageContainer>
          ) : (
            <YourMessageContainer>
              <ProfileImage
                src="/profile.jpeg"
                style={
                  index === 0 ||
                  messageList[index - 1].user.name !== message.user.name
                    ? { visibility: "visible" }
                    : { visibility: "hidden" }
                }
              />
              <YourMessage>{message.chat}</YourMessage>
            </YourMessageContainer>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;
