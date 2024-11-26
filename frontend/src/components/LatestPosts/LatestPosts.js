import React from 'react';
import PostCard from './PostCard.js';

function LatestPosts() {
  return (
    <section style={styles.section}>
      <h2>Latest Posts</h2>
      <div style={styles.filter}>
        <select>
          <option>All Categories</option>
        </select>
      </div>
      {[1, 2, 3, 4, 5].map((_, idx) => (
        <PostCard key={idx} postTitle="lorem ipsum" />
      ))}
    </section>
  );
}

const styles = {
    section: { 
        padding: '2vh' 
    },
    filter: {
        marginBottom: '2vh' 
    }
}

export default LatestPosts; 