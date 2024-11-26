import React from "react";
import Navbar from "../shared/Navbar";
import PostForm from "../components/PostForm";
import BackButton from "../components/BackButton";

function CreatePostPage() {
  const handlePostCreated = (newPost) => {
    console.log("New post created:", newPost);
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>
        <PostForm onPostCreated={handlePostCreated} />
        <BackButton />
      </div>
      
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f0f0",
    minHeight: "100vh",
  },
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
};

export default CreatePostPage;
