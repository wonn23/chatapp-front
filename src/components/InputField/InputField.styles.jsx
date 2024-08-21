import styled from "styled-components";

export const InputArea = styled.div`
  background-color: red;
  height: 45px;
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0;
  align-items: center;
  box-sizing: border-box;
  border-top: 1px solid #ddd;
`;

export const PlusButton = styled.div`
  background-color: lightslategray;
  width: 50px;
  height: 100%;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
`;

export const InputContainer = styled.form`
  flex-grow: 1;
  align-items: center;
  padding: 0 10px;
`;

export const StyledInput = styled.input`
  flex-grow: 1;
  height: 100%;
  width: 100%;
  padding-left: 5px;
  border: none;
  background-color: white;
  font-size: 16px;

  &::before,
  &::after {
    display: none;
  }

  &:focus {
    outline: none;
  }
`;
export const SendButton = styled.button`
  min-width: 70px;
  height: 100%;
  background-color: #f7e600;
  border: none;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #e6d500;
  }

  &:active {
    background-color: yellow;
  }

  &:disabled {
    background-color: lightgray;
    cursor: not-allowed;
  }
`;
