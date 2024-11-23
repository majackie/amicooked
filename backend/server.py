import psycopg2
import os
from psycopg2 import sql
from psycopg2.extras import RealDictCursor  # Fetch rows as dictionaries
from dotenv import load_dotenv
from flask import Flask, request, jsonify
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

    # TODO - Billy: Input validation id

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
            "topicContent": lesson[2],
            "isInteractive": lesson[3]
        }

        return jsonify(lesson_data)  # Return lesson as JSON

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        # Close cursor and connection if they were created
        if cursor is not None:
            cursor.close()
        if conn is not None:
            conn.close()

@app.route('/tips/<int:id>', methods=['GET'])
def get_tips(id):
    conn = None
    cursor = None

    # TODO - Billy: Input validation id

    try:
        # Create a connection to the PostgreSQL database
        conn = psycopg2.connect(
            host=host,
            port=port,
            user=user,
            password=password,
            dbname=dbname
        )
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        # Execute a query to fetch users
        cursor.execute("SELECT tips.tipId, tips.topicId, tips.tipContent, lessons.topicName FROM tips JOIN lessons ON tips.topicId = lessons.topicId WHERE tips.topicId = %s", (id,))
        tips = cursor.fetchall()

        return jsonify(tips)  # Return tips as JSON list

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        # Close cursor and connection if they were created
        if cursor is not None:
            cursor.close()
        if conn is not None:
            conn.close()

@app.route('/user/<int:id>', methods=['GET'])
def get_score(id):
    conn = None
    cursor = None

    # TODO - Billy: Input validation id

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
        cursor.execute("SELECT SUM(user_points.points) as total_points FROM user_points WHERE user_points.userid = %s", (id,))
        points = cursor.fetchone()

        point_data = {
            "total_points": points[0]
        }

        return jsonify(point_data)  # Return total point as JSON

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        # Close cursor and connection if they were created
        if cursor is not None:
            cursor.close()
        if conn is not None:
            conn.close()

@app.route('/update_points', methods=['POST'])
def update_points():
    conn = None
    cursor = None

    # TODO - Billy: Input validation
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    userid = data.get('userid')
    topicid = data.get('topicid')
    points = data.get('points', 0)

    if not userid or not topicid:
        return jsonify({"error": "Missing userid or topicid"}), 400

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
        cursor.execute("INSERT INTO user_points (userid, topicid, points) VALUES (%s, %s, %s) ON CONFLICT (userid, topicid) DO UPDATE SET points = user_points.points + EXCLUDED.points, updated_at = CURRENT_TIMESTAMP;", (userid, topicid, points,))
        conn.commit()
        return jsonify({"message":"Points updated successfully for userid = {userid}"}), 200 

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        # Close cursor and connection if they were created
        if cursor is not None:
            cursor.close()
        if conn is not None:
            conn.close()

@app.route('/get_lesson_status', methods=['GET'])
def get_lesson_status():
    conn = None
    cursor = None

    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    userid = data.get('userid')
    topicid = data.get('topicid')

    if not userid or not topicid:
        return jsonify({"error": "Missing userid or topicid"}), 400

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
        cursor.execute("SELECT completed FROM user_lessons WHERE user_lessons.userid = %s AND user_lessons.topicid = %s", (userid, topicid))
        status = cursor.fetchone()

        lesson_data = {
            "lesson_status": status[0]
        }

        return jsonify(lesson_data)  # Return total point as JSON

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        # Close cursor and connection if they were created
        if cursor is not None:
            cursor.close()
        if conn is not None:
            conn.close()

@app.route('/complete_lesson', methods=['POST'])
def complete_lesson():
    conn = None
    cursor = None

    # TODO - Billy: Input validation
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    userid = data.get('userid')
    topicid = data.get('topicid')

    if not userid or not topicid:
        return jsonify({"error": "Missing userid or topicid"}), 400

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
        cursor.execute("INSERT INTO user_lessons (userid, topicid, completed) VALUES (%s, %s, TRUE) ON CONFLICT (userid, topicid) DO UPDATE SET completed = TRUE, updated_at = CURRENT_TIMESTAMP;", (userid, topicid,))
        conn.commit()
        return jsonify({"message":"Lesson status updated successfully for userid = {userid}"}), 200 

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
