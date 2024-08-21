import styled from "styled-components";
import { Input as MUIInput } from "@mui/base/Input";
import { Button as MUIButton } from "@mui/base/Button";

export const InputArea = styled.div`
  background-color: red;
  height: 50px;
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 0;
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
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const StyledInput = styled(MUIInput)`
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
export const SendButton = styled(MUIButton)`
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
