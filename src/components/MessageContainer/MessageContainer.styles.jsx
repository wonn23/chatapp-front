import styled from "styled-components";

export const MessageList = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* 세로 스크롤 허용 */
  padding-right: 10px; /* 스크롤 바와 텍스트 간격 조정 */
  padding-bottom: 12px; /* InputArea와 메시지 사이의 간격을 확보 */
  margin-bottom: 20px;

  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

export const MessageItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ $isMyMessage }) =>
    $isMyMessage ? "flex-end" : "flex-start"};
  margin-bottom: 10px;
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: ${({ $isMyMessage }) => ($isMyMessage ? "0" : "10px")};
  margin-left: ${({ $isMyMessage }) => ($isMyMessage ? "10px" : "0")};
`;

export const MessageText = styled.div`
  background-color: ${({ $isMyMessage }) =>
    $isMyMessage ? "#f7e600" : "#eee"};
  padding: 10px;
  border-radius: 8px;
  max-width: 60%;
  text-align: ${({ $isMyMessage }) => ($isMyMessage ? "right" : "left")};
  color: ${({ $isMyMessage }) => ($isMyMessage ? "#000" : "#000")};
`;
