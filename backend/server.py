import psycopg2
import os
from psycopg2 import sql
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load environment variables
load_dotenv()

# Define your connection parameters
host = os.getenv("DB_HOST")
port = os.getenv("DB_PORT")
user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
dbname = os.getenv("DB_NAME")

@app.route('/api/users', methods=['GET'])
def get_users():
    conn = None
    cursor = None
    user_list = []  # Initialize user list

    try:
        # Create a connection to the PostgreSQL database
        conn = psycopg2.connect(
            host=host,
            port=port,
            user=user,
            password=password,
            dbname=dbname
        )
        cursor = conn.cursor()

        # Execute a query to fetch users
        cursor.execute("SELECT * FROM users;")
        users = cursor.fetchall()

        # Create a list of users
        for user_record in users:
            user_list.append({
                'id': user_record[0],         # Assuming first column is ID
                'username': user_record[1],
                'password': user_record[2],
                'isAdmin': user_record[3] # Assuming second column is Name
                # Add more fields as necessary
            })

        return jsonify(user_list)  # Return users as JSON

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        # Close cursor and connection if they were created
        if cursor is not None:
            cursor.close()
        if conn is not None:
            conn.close()

@app.route('/lesson/<int:id>', methods=['GET'])
def get_lesson(id):
    conn = None
    cursor = None

    try:
        # Create a connection to the PostgreSQL database
        conn = psycopg2.connect(
            host=host,
            port=port,
            user=user,
            password=password,
            dbname=dbname
        )
        cursor = conn.cursor()

        # Execute a query to fetch users
        cursor.execute("SELECT * FROM lessons WHERE topicId = %s", (id,))
        lesson = cursor.fetchone()

        lesson_data = {
            "topicId": lesson[0],
            "topicName": lesson[1],
            "topicContent": lesson[2]
        }

        return jsonify(lesson_data)  # Return users as JSON

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        # Close cursor and connection if they were created
        if cursor is not None:
            cursor.close()
        if conn is not None:
            conn.close()

if __name__ == '__main__':
    app.run(debug=True)
