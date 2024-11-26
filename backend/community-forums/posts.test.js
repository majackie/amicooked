const request = require('supertest');
const { app, pool } = require('./app'); // Import both app and pool

describe('Posts API', () => {
    let postId;

    // Set up: Insert a user before running tests
    beforeAll(async () => {
        try {
            await pool.query(`INSERT INTO users (id, name, email) VALUES (1, 'Test User', 'testuser@example.com') ON CONFLICT (id) DO NOTHING`);
        } catch (error) {
            console.error('Error setting up test user:', error);
        }
    });

    it('should create a new post', async () => {
        const res = await request(app)
            .post('/posts')
            .send({
                user_id: 1,
                title: 'Test Post',
                content: 'This is a test post'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        postId = res.body.id; // Save the created post ID for further tests

        if (!postId) {
            throw new Error("postId is undefined. Post creation failed.");
        }
    });

    it('should retrieve all posts', async () => {
        const res = await request(app).get('/posts');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('should retrieve a post by ID', async () => {
        if (!postId) throw new Error("postId is undefined. Skipping this test.");
        const res = await request(app).get(`/posts/${postId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', postId);
    });

    it('should update a post by ID', async () => {
        if (!postId) throw new Error("postId is undefined. Skipping this test.");
        const res = await request(app)
            .put(`/posts/${postId}`)
            .send({
                title: 'Updated Test Post',
                content: 'Updated content'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'Updated Test Post');
    });

    it('should delete a post by ID', async () => {
        if (!postId) throw new Error("postId is undefined. Skipping this test.");
        const res = await request(app).delete(`/posts/${postId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Post deleted successfully');
    });

    // Clean up: Delete the test user and posts after all tests
    afterAll(async () => {
        await pool.query('DELETE FROM posts');
        await pool.query('DELETE FROM users WHERE id = 1');
        await pool.end();
    });
});
