import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  ChatRoomListContainer,
  ChatRoomItem,
  Loading,
  CreateRoomButtonContainer,
  CreateRoomButton,
} from "./ChatRoomList.styles";

function ChatRoomList({ setSelectedRoom }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 서버에서 채팅방 목록을 가져오는 API 호출
    const fetchRooms = async () => {
      try {
        // 환경변수로 백엔드 URL 사용
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/room`
        );
        setRooms(response.data); // JSON 변환이 자동으로 처리됨
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleCreateRoom = () => {
    navigate("/create-room"); // 채팅방 생성 페이지로 이동
  };

  return (
    <ChatRoomListContainer>
      <h2>채팅방 목록</h2>

      <CreateRoomButtonContainer>
        <CreateRoomButton onClick={handleCreateRoom}>
          채팅방 생성
        </CreateRoomButton>
      </CreateRoomButtonContainer>

      {loading ? (
        <Loading>로딩 중...</Loading>
      ) : (
        <ul>
          {rooms.map((room) => (
            <Link
              to={`/room/${room._id}`}
              key={room._id}
              style={{ textDecoration: "none" }}
            >
              <ChatRoomItem>
                <span>{room.title}</span>
                <span>참여자: {room.participants}</span>
              </ChatRoomItem>
            </Link>
          ))}
        </ul>
      )}
    </ChatRoomListContainer>
  );
}

export default ChatRoomList;
