import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL); // 소켓을 중앙에서 생성

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App socket={socket} />);

reportWebVitals();
