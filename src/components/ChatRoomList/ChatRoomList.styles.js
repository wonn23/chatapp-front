import styled from "styled-components";

export const ChatRoomListContainer = styled.div`
  height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  background-color: #fafafa;
`;

export const ChatRoomItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  color: #3b3b3b;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e6e6e6;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const Loading = styled.div`
  text-align: center;
  padding: 10px;
  font-size: 16px;
  color: #888;
`;

export const CreateRoomButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
`;

export const CreateRoomButton = styled.button`
  padding: 10px 20px;
  background-color: #f7e600;
  border: none;
  border-radius: 5px;
  color: #3b1e1e;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #e6d500;
  }
`;
