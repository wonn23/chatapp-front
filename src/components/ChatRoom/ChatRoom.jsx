import { useState, useEffect } from "react";
import MessageContainer from "../MessageContainer/MessageContainer";
import InputField from "../InputField/InputField";
import { ChatRoomContainer, ChatRoomHeader } from "./ChatRoom.styles";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChatRoom = ({ socket, user }) => {
  const { roomId } = useParams(); // 방 ID를 URL에서 가져옴
  const [messages, setMessages] = useState([]);
  const [roomInfo, setRoomInfo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // REST API로 초기 방 정보 가져오기
    const fetchRoomInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/room/${roomId}`
        );
        setRoomInfo(response.data); // 방 정보 설정
        console.log("This is room data: ", response.data); // 잘들어옴
        setMessages(
          Array.isArray(response.data.messages) ? response.data.messages : []
        );
      } catch (error) {
        console.error("Failed to fetch room info", error);
      }
    };

    fetchRoomInfo();

    // 방에 입장
    socket.emit("joinRoom", roomId, (res) => {
      if (res.ok) {
        console.log("joinRoom res.data", res.data);
      } else {
        console.error("JoinRoom error:", res.error);
        navigate("/");
      }
    });

    // 소켓을 통해 새 메시지를 수신
    socket.on("roomMessages", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      // 방을 나가면 소켓 이벤트 해제
      socket.emit("leaveRoom", roomId);
      socket.off("message");
    };
  }, [roomId, socket, navigate]);

  const sendMessage = (messageText) => {
    if (messageText.trim() === "") return;

    const newMessage = {
      user,
      text: messageText,
      roomId,
    };
    console.log(newMessage);
    socket.emit("sendMessage", newMessage, (res) => {
      if (res.ok) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });
  };

  if (!roomInfo) {
    return <div>Loading chat room...</div>;
  }

  return (
    <ChatRoomContainer>
      <ChatRoomHeader>{roomInfo.title}</ChatRoomHeader>
      {/* 메시지 목록 컴포넌트 */}
      <MessageContainer messages={messages} user={user} />
      {/* 메시지 입력 필드 컴포넌트 */}
      <InputField onSendMessage={sendMessage} />
    </ChatRoomContainer>
  );
};

export default ChatRoom;
