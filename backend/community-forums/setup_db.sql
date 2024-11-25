-- Create Database
CREATE DATABASE community_forums;

-- Create User
CREATE USER admin_user WITH PASSWORD 'password123';

-- Grant Privileges
GRANT ALL PRIVILEGES ON DATABASE community_forums TO admin_user;

-- Connect to the database to create tables
\c community_forums;

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts Table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
