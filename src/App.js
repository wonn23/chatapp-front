import "./App.css";
import { useCallback, useState } from "react";
import ChatRoomList from "./components/ChatRoomList/ChatRoomList";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import Login from "./components/Login/Login.jsx";
import CreateRoom from "./components/CreateRoom/CreateRoom.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

function App({ socket }) {
  const [user, setUser] = useState("");
  const [rooms, setRooms] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (user) => {
    setUser(user);
    setIsLoggedIn(true);
  };

  const fetchRooms = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/room`
      );
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
    }
  }, []);

  const handleRoomCreation = (newRoom) => {
    setRooms((prevRooms) => [...prevRooms, newRoom]);
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
                element={<ChatRoom socket={socket} user={user} />}
              />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
