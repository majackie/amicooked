import React, { useState } from "react";
import Navbar from "../shared/Navbar.js";
import Header from "../components/Header";
import LatestPosts from "../components/LatestPosts/LatestPosts";
import BackButton from "../components/BackButton.js";
import CreatePostButton from "../components/CreatePostButton.js";

function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Navbar />
      {/* Pass `searchQuery` and `setSearchQuery` to `Header` */}
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <LatestPosts searchQuery={searchQuery} />
      <div style={styles.buttonContainer}>
        <CreatePostButton label="Create Post" to="/user-dashboard/community-page/create-post" />
        <BackButton />
      </div>
    </div>
  );
}

const styles = {
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  },
};

export default CommunityPage;
