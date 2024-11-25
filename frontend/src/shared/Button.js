import React, { useState } from "react";
import styled from "styled-components";

const theme = {
  primary: {
    default: "#1A73E8",
    hover: "#0A529C",
    borderRadius: "5px",
    margin: "10px 0px",
  },
  secondary: {
    default: "#E81A2F",
    hover: "#9C0A0C",
    borderRadius: "5px",
    margin: "10px 0px",
  },
  back: {
    default: "#919191",
    hover: "#5c5c5c",
    borderRadius: "5px",
    margin: "10px 0px",
  },
  round: {
    default: "#1A73E8",
    hover: "#0A529C",
    borderRadius: "50%",
    margin: "0vmin 2vmin",
    top: "100%",
    transformY: "15vmin",
  }
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: ${(props) => theme[props.theme].borderRadius};
  outline: 0;
  border: 0; 
  position: absolute,
  top: ${(props) => theme[props.theme].top};
  transform: translateY(${(props) => theme[props.theme].transformY});
  text-transform: uppercase;
  zIndex: 1;
  margin: ${(props) => theme[props.theme].margin};
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