import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7e600;
`;

const Form = styled.form`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #3b1e1e;
  }
`;

const Button = styled.button`
  background-color: #3b1e1e;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
`;

function Login({ onLogin, socket }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim()) {
      // 유저 이름을 서버로 전송하고, 소켓 서버와 연결
      socket.emit("login", username, (response) => {
        if (response.ok) {
          console.log("User logged in:", response.data);
          onLogin(response.data); // 유저 정보 저장 후 로그인 상태로 전환
          navigate("/"); // 로그인 성공 후 ChatRoomList로 리디렉션
        } else {
          console.error("Login error:", response.error);
        }
      });
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>로그인</h2>
        <Input
          type="text"
          placeholder="이름을 입력하세요"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button type="submit">로그인</Button>
      </Form>
    </Container>
  );
}

export default Login;
