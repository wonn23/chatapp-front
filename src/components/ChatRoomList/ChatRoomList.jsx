import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChatRoomListContainer,
  ChatRoomItem,
  CreateRoomButtonContainer,
  CreateRoomButton,
} from "./ChatRoomList.styles";

function ChatRoomList({ rooms, fetchRooms }) {
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms(); // 컴포넌트 마운트 시 방 목록 불러오기;
  }, [fetchRooms]);

  const handleCreateRoom = () => {
    navigate("/create-room");
  };

  const handleRoomClick = (room) => {
    navigate(`/room/${room._id}`); // 해당 방으로 이동
  };

  return (
    <ChatRoomListContainer>
      <h2>채팅방 목록</h2>

      <CreateRoomButtonContainer>
        <CreateRoomButton onClick={handleCreateRoom}>
          채팅방 생성
        </CreateRoomButton>
      </CreateRoomButtonContainer>

      <ul>
        {rooms.map((room) => (
          <ChatRoomItem
            key={room._id}
            onClick={() => handleRoomClick(room)}
            style={{ cursor: "pointer" }}
          >
            <h3>{room.title}</h3>
            <p>최대 인원: {room.max}</p>
            <p>방장: {room.owner.name}</p>
          </ChatRoomItem>
        ))}
      </ul>
    </ChatRoomListContainer>
  );
}

export default ChatRoomList;
