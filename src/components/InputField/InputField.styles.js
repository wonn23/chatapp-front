import styled from "styled-components";
import { Input } from "@mui/base/Input";
import { Button } from "@mui/base/Button";

export const InputArea = styled.div`
  background-color: red;
  height: 50px;
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
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
  box-sizing: border-box;
  margin-right: 0px;
  padding: 0px;
  border: none;
`;

export const InputContainer = styled.form`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 50px);
  height: 100%;
  padding: 0;
  margin: 0;
`;

export const StyledInput = styled(Input)`
  height: 100%;
  width: 100%;
  border: none;
  padding-left: 5px;

  &:focus {
    outline: none;
  }
`;

export const SendButton = styled(Button)`
  min-width: 70px;
  height: 100%;
  border-radius: 0;
  background-color: #f7e600;
  border: none;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: yellow;
  }

  &:disabled {
    background-color: lightgray;
    cursor: not-allowed;
  }
`;
