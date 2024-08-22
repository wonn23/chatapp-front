import styled from "styled-components";

export const ChatRoomContainer = styled.div`
  height: 97.8vh;
  background: #b6c6d7;
  margin-left: auto;
  margin-right: auto;
  max-width: 28rem;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px; /* 상단에만 패딩 적용 */
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;

export const ChatRoomHeader = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
  color: #333;
`;
