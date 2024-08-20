import "./App.css";
import { useCallback, useState, useEffect } from "react";
import ChatRoomList from "./components/ChatRoomList/ChatRoomList";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import Login from "./components/Login/Login.jsx";
import CreateRoom from "./components/CreateRoom/CreateRoom.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
function App() {
  const [user, setUser] = useState("");
  const [rooms, setRooms] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [socket, setSocket] = useState(null); // 소켓 상태 추가

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_BACKEND_URL); // 로그인 전 소켓 생성
    setSocket(newSocket);

    return () => {
      if (newSocket) newSocket.disconnect(); // 컴포넌트가 언마운트되면 소켓 연결 해제
    };
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    setIsLoggedIn(true);
  };

  // 채팅방 목록을 서버에서 받아오는 함수
  const fetchRooms = useCallback(async () => {
    try {
      // 환경변수로 백엔드 URL 사용
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/room`
      );
      setRooms(response.data); // 서버에서 받아온 방 목록을 상태로 저장
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
    }
  }, []);

  // 방 생성 후 방 목록에 추가
  const handleRoomCreation = (newRoom) => {
    setRooms((prevRooms) => [...prevRooms, newRoom]); // 방 목록에 새 방 추가
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
                element={<ChatRoomList rooms={rooms} fetchRooms={fetchRooms} />}
              />
              <Route
                path="/create-room"
                element={
                  <CreateRoom user={user} onRoomCreated={handleRoomCreation} />
                }
              />
              <Route
                path="/room/:roomId"
                element={
                  <ChatRoom
                    socket={socket} // 소켓 전달
                    user={user}
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
