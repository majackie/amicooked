import React from "react";
import { useNavigate } from "react-router-dom";

function CreatePostButton({ label, to, style }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button style={{ ...styles.button, ...style }} onClick={handleClick}>
      {label}
    </button>
  );
}

const styles = {
  button: {
    height: "auto",
    width: "auto",
    padding: "15px 30px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    margin: "10px",
    textAlign: "center",
    textTransform: "capitalize",
    transition: "transform 0.2s ease",
  },
  buttonHover: {
    backgroundColor: "#2563eb",
    transform: "scale(1.05)",
  },
};

export default CreatePostButton;
