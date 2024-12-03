// Force logs to appear immediately in the test output
global.console.log = console.log.bind(console);
global.console.error = console.error.bind(console);

const request = require('supertest');
const { app, pool } = require('./app.js');

// Mock environment variables if needed
process.env.DB_USER = 'mock_user';
process.env.DB_HOST = 'localhost';
process.env.DB_NAME = 'mock_database';
process.env.DB_PASSWORD = 'mock_password';
process.env.DB_PORT = 5432;

// Load SQL setup and seed data
const setupSchemaSQL = `
    -- Drop existing tables if they exist
    DROP TABLE IF EXISTS comments CASCADE;
    DROP TABLE IF EXISTS posts CASCADE;

    -- Create Posts Table
    CREATE TABLE posts (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        title VARCHAR(200) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Create Comments Table
    CREATE TABLE comments (
        id SERIAL PRIMARY KEY,
        post_id INT NOT NULL,
        username VARCHAR(100) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
    );
`;

const seedDataSQL = `
    -- Insert data into posts table
    INSERT INTO posts (id, username, title, content, created_at) VALUES
    (1, 'cyberwarrior101', 'Understanding Two-Factor Authentication', 'Two-Factor Authentication (2FA) adds an extra layer of security to your accounts. Learn why it is essential and how to set it up on various platforms.', '2024-12-01 10:00:00'),
    (2, 'privacyguru99', 'The Risks of Public Wi-Fi Networks', 'Using public Wi-Fi can expose your data to hackers. Learn how to protect yourself by using VPNs and other secure practices.', '2024-12-02 15:30:00'),
    (3, 'secureme_admin', 'Top Password Management Tools of 2024', 'Explore the best tools available for managing your passwords securely, and say goodbye to reusing weak passwords.', '2024-12-03 08:20:00'),
    (4, 'dataprotector45', 'How to Spot Phishing Emails', 'Phishing emails are becoming more sophisticated. Discover how to identify them and protect your personal information.', '2024-12-03 12:45:00');

    -- Insert data into comments table
    INSERT INTO comments (id, post_id, username, content, created_at) VALUES
    (1, 1, 'user123', 'Great explanation of 2FA! I use Google Authenticator and it works perfectly.', '2024-12-01 12:00:00'),
    (2, 1, 'techsavvy', 'What do you think about hardware tokens for 2FA?', '2024-12-01 13:15:00'),
    (3, 2, 'roadwarrior77', 'Thanks for the tips. I always wondered if using a VPN was worth it!', '2024-12-02 16:00:00'),
    (4, 2, 'anonymous', 'Public Wi-Fi is such a trap. Got my data stolen last year.', '2024-12-02 17:45:00'),
    (5, 3, 'securitynerd', 'I use LastPass, but heard about a breach recently. Any thoughts?', '2024-12-03 09:00:00'),
    (6, 4, 'phishingpro', 'This is a life-saver! I almost fell for a phishing scam last week.', '2024-12-03 13:30:00');
`;

// Run before all tests
beforeAll(async () => {
    // Set up the database schema
    await pool.query(setupSchemaSQL);
    // Seed the database with mock data
    await pool.query(seedDataSQL);
});

// Run after all tests
afterAll(async () => {
    // Drop all tables and close the connection
    await pool.query(`
        DROP TABLE IF EXISTS comments CASCADE;
        DROP TABLE IF EXISTS posts CASCADE;
    `);
    await pool.end(); // Close the database connection pool
});

// Tests for routes
describe('API Functional Tests', () => {
    it('GET /posts - should return all posts', async () => {
        const res = await request(app).get('/posts');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(4); // Expect seeded 4 posts
    });

    it('GET /posts/:postId - should return a post by ID', async () => {
        const postId = 1;
        const res = await request(app).get(`/posts/${postId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', postId);
        expect(res.body).toHaveProperty('title', 'Understanding Two-Factor Authentication');
    });

    it('PUT /posts/:postId - should update a post by ID', async () => {
        const postId = 1;
        const updatedData = {
            title: 'Updated Title',
            content: 'Updated Content',
        };
        const res = await request(app).put(`/posts/${postId}`).send(updatedData);
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe(updatedData.title);
    });

    it('DELETE /posts/:postId - should delete a post by ID', async () => {
        const postId = 1;
        const res = await request(app).delete(`/posts/${postId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Post deleted successfully');
    });

    it('POST /comments - should add a comment to a post', async () => {
        const newComment = {
            post_id: 2,
            username: 'commenter4',
            content: 'New comment for Post 2',
        };
        const res = await request(app).post('/comments').send(newComment);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.content).toBe(newComment.content);
    });
});
