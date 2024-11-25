const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const{ Pool } = require('pg');
require('dotenv').config();

const app = express();

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Database Connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


// Gets all posts in the database
app.get('/posts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// Get a single post by ID
app.get('/posts/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
        const result = await pool.query('SELECT * FROM posts WHERE id = $1', [postId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Failed to fetch post' });
    }
});

// Create a new post
app.post('/posts', async (req, res) => {
    const { user_id, title, content } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
            [user_id, title, content]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

// Update a post by ID
app.put('/posts/:postId', async (req, res) => {
    const { postId } = req.params;
    const { title, content } = req.body;
    try {
        const result = await pool.query(
            'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
            [title, content, postId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update post' });
    }
});

// Delete a post by ID
app.delete('/posts/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
        const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [postId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully', deletedPost: result.rows[0] });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

// Health Check Route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'up' });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start Server - UNCOMMENT
// app.listen(PORT, () => {
//     console.log(`Microservice running on port ${PORT}`);
// });

module.exports = { app, pool }; // Export the app for Supertest to use directly