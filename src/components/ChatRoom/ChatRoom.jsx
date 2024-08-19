import { useState, useEffect } from "react";
import MessageContainer from "../MessageContainer/MessageContainer";
import InputField from "../InputField/InputField";
import { ChatRoomContainer, ChatRoomHeader } from "./ChatRoom.styles";

const ChatRoom = ({ selectedRoom, username, userId, socket }) => {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedRoom) {
      socket.emit("joinRoom", selectedRoom._id);

      socket.on("roomMessages", (messages) => {
        setMessageList(messages);
      });
    }

    return () => {
      socket.emit("leaveRoom", selectedRoom._id);
      socket.off("roomMessages");
    };
  }, [selectedRoom, socket]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message.trim() === "") return;

    const newMessage = {
      user: { _id: userId, name: username },
      chat: message,
      roomId: selectedRoom._id,
    };

    socket.emit("sendMessage", newMessage, (res) => {
      if (res.ok) {
        setMessageList([...messageList, newMessage]);
        setMessage("");
      }
    });
  };

  if (!selectedRoom) {
    return <div>Loading chat room...</div>;
  }

  return (
    <ChatRoomContainer>
      <ChatRoomHeader>{selectedRoom.name}</ChatRoomHeader>
      <MessageContainer
        messageList={messageList}
        user={{ _id: userId, name: username }}
      />
      <InputField
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </ChatRoomContainer>
  );
};

export default ChatRoom;
