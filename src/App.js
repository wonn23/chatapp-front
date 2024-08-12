import { useState, useEffect } from "react";
import ChatRoomList from "./components/ChatRoomList/ChatRoomList";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import socket from "./server";
import "./App.css";

function App() {
  const [chatRooms, setChatRooms] = useState([
    { _id: 1, name: "ChatRoom 1" },
    { _id: 2, name: "ChatRoom 2" },
  ]);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      askUserName();
    }
  });

  const loadMoreChatRooms = () => {
    // 더 많은 채팅방 로드 (무한 스크롤)
    const newChatRooms = [
      { _id: chatRooms.length + 1, name: `Chat Room ${chatRooms.length + 1}` },
    ];
    setChatRooms([...chatRooms, newChatRooms]);
  };

  const selectChatRoom = (room) => {
    // 채팅방 선택 시 동작
    setSelectedRoom(room);
  };

  const askUserName = () => {
    const username = prompt("당신의 이름을 입력하세요.");

    if (username) {
      socket.emit("login", username, (res) => {
        if (res?.ok) {
          setUser(res.data);
        } else {
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
          askUserName();
        }
      });
    } else {
      alert("이름을 입력해야 합니다.");
      askUserName();
    }
  };

  return (
    <div>
      {selectedRoom ? (
        <ChatRoom selectedRoom={selectedRoom} user={user} socket={socket} />
      ) : (
        <ChatRoomList
          chatRooms={chatRooms}
          loadMoreChatRooms={loadMoreChatRooms}
          selectChatRoom={selectChatRoom}
        />
      )}
    </div>
  );
}

export default App;
