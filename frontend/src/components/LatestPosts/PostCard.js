import React from 'react';

function PostCard({ postTitle }) {
  return (
    <div style={styles.postCard}>
      {postTitle}
    </div>
  );
}

const styles = {
    postCard: {
        border: '1px solid #3b82f6',
        borderRadius: '5px',
        padding: '20px',
        margin: '10px'
    }
}

export default PostCard;