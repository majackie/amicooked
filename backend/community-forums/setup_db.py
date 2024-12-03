import psycopg2
from psycopg2 import sql
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

# Database configuration
DB_NAME = "community_forums"
DB_USER = "admin_user"
DB_PASSWORD = "password123"
DB_HOST = "localhost"
DB_PORT = "5432"

# SQL commands
TABLES_AND_DATA_SQL = """
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
"""

# Function to check and create database if not exists
def ensure_database_exists():
    try:
        # Connect to the default 'postgres' database
        connection = psycopg2.connect(
            dbname="postgres",
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        connection.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = connection.cursor()

        # Check if the database exists
        cursor.execute(f"SELECT 1 FROM pg_database WHERE datname = '{DB_NAME}';")
        exists = cursor.fetchone()

        if not exists:
            cursor.execute(sql.SQL(f"CREATE DATABASE {DB_NAME};"))
            print(f"Database {DB_NAME} created successfully.")
        else:
            print(f"Database {DB_NAME} already exists.")

        cursor.close()
        connection.close()

    except Exception as e:
        print(f"An error occurred while ensuring database existence: {e}")

# Function to create tables and insert data
def setup_tables_and_data():
    try:
        # Connect to the target database
        connection = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        cursor = connection.cursor()

        # Execute the SQL commands to create tables and insert data
        cursor.execute(TABLES_AND_DATA_SQL)
        connection.commit()
        print("Tables created and data inserted successfully.")

        cursor.close()
        connection.close()

    except Exception as e:
        print(f"An error occurred while setting up tables and data: {e}")

# Main function
def main():
    ensure_database_exists()
    setup_tables_and_data()

if __name__ == "__main__":
    main()
