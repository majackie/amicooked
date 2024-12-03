import styled from "styled-components";

/**
 * A Button component with custom styling themes.
 */

const theme = {
  primary: {
    default: "#1A73E8",
    hover: "#0A529C",
    borderRadius: "5px",
    margin: "10px 0px",
    fontColor: "white",
    shadowColor: "lightgrey",
  },
  primaryInverse: {
    default: "white",
    hover: "lightgrey",
    borderRadius: "5px",
    margin: "10px 0px",
    fontColor: "#1A73E8",
    shadowColor: "black",
  },
  primaryOutline: {
    default: "#1A73E8",
    hover: "#0A529C",
    borderRadius: "5px",
    margin: "10px 0px",
    fontColor: "white",
    shadowColor: "white",
  },
  secondary: {
    default: "#0A529C",
    hover: "#073768",
    borderRadius: "5px",
    margin: "10px 0px",
    fontColor: "white",
    shadowColor: "lightgrey",
  },
  back: {
    default: "#A4A4A4",
    hover: "#5c5c5c",
    borderRadius: "5px",
    margin: "10px 0px",
    fontColor: "white",
    shadowColor: "lightgrey",
  },
  round: {
    default: "#1A73E8",
    hover: "#0A529C",
    borderRadius: "50%",
    margin: "0vmin 2vmin",
    top: "100%",
    transformY: "15vmin",
    fontColor: "white",
    shadowColor: "lightgrey",
  },
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: ${(props) => theme[props.theme].fontColor};
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
  box-shadow: 0px 2px 2px ${(props) => theme[props.theme].shadowColor};
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