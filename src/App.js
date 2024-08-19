import "./App.css";
import { useState, useEffect } from "react";
import ChatRoomList from "./components/ChatRoomList/ChatRoomList";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import Login from "./components/Login/Login.jsx";
import CreateRoom from "./components/CreateRoom/CreateRoom.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";

function App() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null); // 선택된 방 상태 추가
  const [socket, setSocket] = useState(null); // 소켓 상태 추가

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_BACKEND_URL); // 로그인 전 소켓 생성
    setSocket(newSocket);

    return () => {
      if (newSocket) newSocket.disconnect(); // 컴포넌트가 언마운트되면 소켓 연결 해제
    };
  }, []);

  const handleLogin = (user) => {
    setUsername(user.name);
    setUserId(user._id); // 유저 ID 설정
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div>
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} socket={socket} />
        ) : (
          <div>
            <Routes>
              <Route
                path="/"
                element={<ChatRoomList setSelectedRoom={setSelectedRoom} />}
              />
              <Route
                path="/create-room"
                element={<CreateRoom userId={userId} />}
              />
              <Route
                path="/room/:roomId"
                element={
                  <ChatRoom
                    username={username}
                    userId={userId}
                    selectedRoom={selectedRoom} // 선택된 방 전달
                    socket={socket} // 소켓 전달
                  />
                }
              />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
