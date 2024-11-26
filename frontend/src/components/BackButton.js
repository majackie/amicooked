import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      style={{
        ...styles.button,
        ...(isHovered ? styles.buttonHover : {}),
      }}
      onClick={() => navigate(-1)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Go Back
    </button>
  );
}

const styles = {
  button: {
    height: "auto",
    width: "auto",
    padding: "15px 30px",
    backgroundColor: "#ffffff",
    color: "#1d4ed8",
    border: "2px solid #1d4ed8",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    textAlign: "center",
    textTransform: "capitalize",
    margin: "10px",
    transition: "transform 0.2s ease",
  },
  buttonHover: {
    backgroundColor: "#1d4ed8",
    color: "#ffffff",
    transform: "scale(1.05)",
  },
};

export default BackButton;
