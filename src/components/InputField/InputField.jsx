import React, { useState } from "react";
import {
  InputArea,
  PlusButton,
  InputContainer,
  StyledInput,
  SendButton,
} from "./InputField.styles.jsx";

const InputField = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!isComposing && message.trim()) {
      onSendMessage(message);
      setMessage(""); // 메시지 전송 후 입력 필드 비우기
    }
  };

  const handleKeyDown = (e) => {
    if (!isComposing && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 기본 동작을 막기 전에 handleSend를 호출
      handleSend(e);
    }
  };

  const handleCompositionStart = () => setIsComposing(true); // 한글 입력 시작
  const handleCompositionEnd = () => setIsComposing(false); // 한글 입력 완료

  return (
    <InputContainer onSubmit={handleSend}>
      <InputArea>
        <PlusButton>+</PlusButton>
        <StyledInput
          placeholder="메시지를 입력하세요..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown} // 엔터 키 눌림 감지
          onCompositionStart={handleCompositionStart} // 한글 입력 시작 감지
          onCompositionEnd={handleCompositionEnd} // 한글 입력 완료 감지
        />
        <SendButton type="submit" disabled={!message.trim()}>
          전송
        </SendButton>
      </InputArea>
    </InputContainer>
  );
};

export default InputField;
