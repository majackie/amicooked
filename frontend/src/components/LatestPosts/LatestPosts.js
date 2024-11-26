import React, { useState, useEffect } from 'react';
import PostCard from './PostCard.js';
import axios from 'axios';

function LatestPosts({ searchQuery }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const getPosts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3030/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleNextPage = () => {
    if (indexOfLastPost < filteredPosts.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section style={styles.section}>
      <h2>Latest Posts</h2>
      <div style={styles.filter}></div>
      {currentPosts.length > 0 ? (
        currentPosts.map((post) => (
          <PostCard
            key={post.id}
            postId={post.id}
            postUser={post.username}
            postTitle={post.title}
            postContent={post.content}
            onDelete={handleDeletePost}
          />
        ))
      ) : (
        <p>No posts match your search.</p>
      )}
      <div style={styles.pagination}>
        <button
          style={styles.paginationButton}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          style={styles.paginationButton}
          onClick={handleNextPage}
          disabled={indexOfLastPost >= filteredPosts.length}
        >
          Next
        </button>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '2vh',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  paginationButton: {
    height: 'auto',
    width: 'auto',
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default LatestPosts;
