import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  CreateRoomContainer,
  FormContainer,
  Input,
  Button,
} from "./CreateRoom.styles";

const CreateRoom = ({ user, onRoomCreated }) => {
  const [title, setTitle] = useState("");
  const [max, setMax] = useState(10);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/room`,
        {
          title,
          max,
          owner: user._id, // 유저의 ObjectId를 owner로 설정
          participants: [user._id], // 참가자로도 owner 추가
        }
      );
      const newRoom = response.data;
      onRoomCreated(newRoom);

      navigate(`/room/${response.data._id}`); // 방이 생성되면 해당 방으로 이동
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  return (
    <CreateRoomContainer>
      <FormContainer onSubmit={handleSubmit}>
        <h2>채팅방 생성</h2>
        <Input
          type="text"
          placeholder="채팅방 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="최대 인원"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          min="2"
          max="10"
          required
        />
        <Button type="submit">채팅방 생성</Button>
      </FormContainer>
    </CreateRoomContainer>
  );
};

export default CreateRoom;
