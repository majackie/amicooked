import React, { useState } from 'react';
import axios from 'axios';

function PostCard({ postId, postUser, postTitle, postContent, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) fetchComments();
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3030/posts/${postId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    try {
      const username = localStorage.getItem('username') || 'Anonymous';
      const response = await axios.post('http://127.0.0.1:3030/comments', {
        post_id: postId,
        username,
        content: comment,
      });
      setComments([...comments, response.data]);
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`http://127.0.0.1:3030/posts/${postId}`);
      if (onDelete) onDelete(postId); // Notify parent to update posts
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const currentUser = localStorage.getItem('username');

  return (
    <div style={styles.postCard}>
      <div style={styles.header} onClick={toggleContent}>
        <h3>{postUser} | {postTitle}</h3>
        <button style={styles.toggleButton}>
          {isExpanded ? '↑' : '↓'}
        </button>
      </div>
      {isExpanded && (
        <div style={styles.content}>
          <p>{postContent}</p>

          {currentUser === postUser && (
            <button style={styles.deleteButton} onClick={handleDeletePost}>
              Delete Post
            </button>
          )}

          <div style={styles.commentsSection}>
            <h4>Comments</h4>
            <div>
              {comments.map((c, idx) => (
                <p key={idx}><strong>{c.username}:</strong> {c.content}</p>
              ))}
            </div>
            <input
              style={styles.commentInput}
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button style={styles.addCommentButton} onClick={handleAddComment}>
              Add Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  postCard: {
    border: '1px solid #3b82f6',
    borderRadius: '5px',
    padding: '20px',
    margin: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleButton: {
    background: 'transparent',
    border: 'none',
    color: '#3b82f6',
    fontSize: '16px',
    cursor: 'pointer',
  },
  content: {
    marginTop: '10px',
    color: '#333',
  },
  deleteButton: {
    height: 'auto',
    width: 'auto',
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  commentsSection: {
    marginTop: '20px',
  },
  commentInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  addCommentButton: {
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

export default PostCard;
