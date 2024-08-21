import { useState, useEffect } from "react";
import MessageContainer from "../MessageContainer/MessageContainer";
import InputField from "../InputField/InputField";
import { ChatRoomContainer, ChatRoomHeader } from "./ChatRoom.styles.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChatRoom = ({ socket, user }) => {
  const { roomId } = useParams(); // 방 ID를 URL에서 가져옴
  const [messages, setMessages] = useState([]);
  const [roomInfo, setRoomInfo] = useState(null);

  useEffect(() => {
    // REST API로 초기 방 정보 가져오기
    const fetchRoomInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/room/${roomId}`
        );
        setRoomInfo(response.data); // 방 정보 설정
        setMessages(response.data.messages || []);
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
      }
    });

    // 소켓을 통해 새 메시지를 수신
    socket.on("roomMessages", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      // 방을 나가면 소켓 이벤트 해제
      socket.emit("leaveRoom", roomId);
      socket.off("roomMessages");
    };
  }, [roomId, socket]);

  const sendMessage = (messageText) => {
    if (messageText.trim() === "") return;

    const newMessage = {
      user,
      text: messageText,
      roomId,
    };

    socket.emit("sendMessage", newMessage, (res) => {
      if (res.ok) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        console.error("Message send failed:", res.error);
        // navigate("/")가 호출되는 부분 확인
      }
    });
  };

  if (!roomInfo) {
    return <div>Loading chat room...</div>;
  }

  return (
    <ChatRoomContainer>
      <ChatRoomHeader>{roomInfo.title}</ChatRoomHeader>
      <MessageContainer messages={messages} user={user} />
      <InputField onSendMessage={sendMessage} />
    </ChatRoomContainer>
  );
};

export default ChatRoom;
