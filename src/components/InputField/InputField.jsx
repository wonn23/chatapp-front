import React from "react";
import {
  InputArea,
  PlusButton,
  InputContainer,
  StyledInput,
  SendButton,
} from "./InputField.styles.js";

const InputField = ({ message, setMessage, sendMessage }) => {
  return (
    <InputArea>
      <PlusButton>+</PlusButton>
      <InputContainer onSubmit={sendMessage}>
        <StyledInput
          placeholder="Type in here…"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          multiline={false}
          rows={1}
        />
        <SendButton type="submit" disabled={message === ""}>
          전송
        </SendButton>
      </InputContainer>
    </InputArea>
  );
};

export default InputField;
