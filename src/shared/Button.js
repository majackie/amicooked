import React, { useState } from "react";
import styled from "styled-components";

const theme = {
  primary: {
    default: "#1A73E8",
    hover: "#0A529C",
  },
  secondary: {
    default: "#E81A2F",
    hover: "#9C0A0C",
  },
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  border: 0; 
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

export default Button;