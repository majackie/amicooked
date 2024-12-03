import React, { useState } from "react";
import axios from "axios";

function PostForm({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem("username");

    if (!username) {
      setMessage("No username found. Please log in.");
      return;
    }

    if (!title || !content) {
      setMessage("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:3030/posts", {
        username,
        title,
        content,
      });
      setMessage("Post created successfully!");
      setTitle("");
      setContent("");
      if (onPostCreated) onPostCreated(response.data);
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("Failed to create post. Please try again.");
    }
  };

  return (
    <section style={styles.section}>
      <h2>Create a Post</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          style={styles.textarea}
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button style={styles.button} type="submit">
          Submit
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </section>
  );
}

const styles = {
  section: {
    padding: "2vh",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    margin: "2vh 0",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minHeight: "100px",
  },
  button: {
    height: "auto",
    width: "auto",
    padding: "10px 20px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  message: {
    marginTop: "10px",
    color: "#3b82f6",
  },
};

export default PostForm;
