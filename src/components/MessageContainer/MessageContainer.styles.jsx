import styled from "styled-components";

export const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const MessageItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const MessageText = styled.div`
  background-color: ${({ $isMyMessage }) =>
    $isMyMessage ? "#f7e600" : "#eee"};
  padding: 10px;
  border-radius: 8px;
  max-width: 60%;
`;
