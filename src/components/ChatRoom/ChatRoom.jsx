import { useState, useEffect } from "react";
import MessageContainer from "../MessageContainer/MessageContainer";
import InputField from "../InputField/InputField";
import { ChatRoomContainer, ChatRoomHeader } from "./ChatRoom.styles.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChatRoom = ({ socket, user }) => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [roomInfo, setRoomInfo] = useState(null);

  useEffect(() => {
    // REST API로 초기 방 정보 가져오기
    const fetchRoomInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/room/${roomId}`
        );
        console.log("fetchRoomInfo의 messages", response.data.messages);
        setRoomInfo(response.data);
        setMessages(response.data.messages || []);
      } catch (error) {
        console.error("Failed to fetch room info", error);
      }
    };

    fetchRoomInfo();

    // 방에 입장
    socket.emit("joinRoom", roomId, (res) => {
      if (res.ok) {
        console.log("joinRoom success:", res.data);
      } else {
        console.error("joinRoom error:", res.error);
      }
    });

    // 소켓 이벤트 핸들러 설정 (중복 방지)
    const handleMessage = (newMessage) => {
      console.log("서버로부터 브로드캐스트 받은 메시지:", newMessage); // 해당 메시지안에 user는 달랑 userId(ObjectId만 들어있다.)
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on("message", handleMessage);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      socket.emit("leaveRoom", roomId);
      socket.off("message", handleMessage); // 이벤트 핸들러 제거
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
        console.log("클라이언트의 sendMessage:", newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        console.error("Message send failed:", res.error);
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
