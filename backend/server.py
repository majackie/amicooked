import psycopg2
import os
from psycopg2 import sql
from psycopg2.extras import RealDictCursor  # Fetch rows as dictionaries
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta
import input_validator

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config["JWT_SECRET_KEY"] = "your_secret_key"
jwt = JWTManager(app)

# Load environment variables
load_dotenv()

# Define your connection parameters
host = os.getenv("DB_HOST")
port = os.getenv("DB_PORT")
user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
dbname = os.getenv("DB_NAME")

def get_db_connection():
    return psycopg2.connect(
        host=host,
        port=port,
        user=user,
        password=password,
        dbname=dbname
    )

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
                'admin': user_record[3] # Assuming second column is Name
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

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    
    # Hash the password
    hashed_password = generate_password_hash(password)
    
    conn = None
    cursor = None

    try:
        # Create a connection to the PostgreSQL database
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Check if the user already exists
        cursor.execute("SELECT userid FROM users WHERE username = %s;", (username,))
        if cursor.fetchone():
            return jsonify({"msg": "Username already exists"}), 400
        
        # Insert the new user
        cursor.execute(
            "INSERT INTO users (username, password, admin) VALUES (%s, %s, %s) RETURNING userid;",
            (username, hashed_password, False)
        )
        user_id = cursor.fetchone()[0]
        conn.commit()
        
        return jsonify({"msg": "Signup successful", "user_id": user_id}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    finally:
        # Close cursor and connection if they were created
        if cursor is not None:
            cursor.close()
        if conn is not None:
            conn.close()

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    conn = None
    cursor = None

    try:
        # Create a connection to the PostgreSQL database
        conn = get_db_connection()
        cursor = conn.cursor()

        # Fetch user by username
        cursor.execute("SELECT userid, password FROM users WHERE username = %s;", (username,))
        user_record = cursor.fetchone()

        if user_record and check_password_hash(user_record[1], password):
            # Password is correct, create a JWT token
            access_token = create_access_token(identity=str(user_record[0]), fresh=True, expires_delta=timedelta(hours=1))
            return jsonify(access_token=access_token, userid=user_record[0]), 200
        else:
            return jsonify({"msg": "Invalid credentials"}), 401
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        # Close cursor and connection if they were created
        if cursor is not None:
            cursor.close()
        if conn is not None:
            conn.close()

# Create a simple in-memory blacklist
token_blacklist = set()

@app.route('/api/logout', methods=['POST'])
@jwt_required()
def logout():
    # Get the JWT from the request
    jti = get_jwt()['jti']  # jti is a unique identifier for the JWT
    token_blacklist.add(jti)  # Add the token's jti to the blacklist
    return jsonify({"msg": "Successfully logged out"}), 200

from flask_jwt_extended import JWTManager, get_jwt

jwt = JWTManager(app)

@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(jwt_header, jwt_payload):
    jti = jwt_payload['jti']
    return jti in token_blacklist

@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route('/lesson/<int:id>', methods=['GET'])
@jwt_required()
def get_lesson(id):
    conn = None
    cursor = None

    if not input_validator.is_valid_number(id):
        return jsonify({'error': 'Invalid id'}), 400

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

@app.route('/get_total_lessons', methods=['GET'])
@jwt_required()
def get_total_lessons():
    conn = None
    cursor = None

    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({'error': 'Authentication required'}), 401

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
        cursor.execute("SELECT COUNT(*) FROM lessons;")
        lesson = cursor.fetchone()

        lesson_data = {
            "total_lessons": lesson[0]
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

    if not input_validator.is_valid_number(id):
        return jsonify({'error': 'Invalid id'}), 400

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

@app.route('/get_score/<int:userid>', methods=['GET'])
@jwt_required()
def get_score(userid):
    conn = None
    cursor = None

    auth_header = request.headers.get('Authorization')
    print("auth header "+auth_header)
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({'error': 'Authentication required'}), 401
    
    if not input_validator.is_valid_number(userid):
        return jsonify({'error': 'Invalid id'}), 400
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
        cursor.execute("SELECT SUM(user_points.points) as total_points FROM user_points WHERE user_points.userid = %s", (userid,))
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
@jwt_required()
def update_points():
    conn = None
    cursor = None

    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    userid = data.get('userid')
    topicid = data.get('topicid')
    points = data.get('points', 0)

    if not input_validator.is_valid_number(userid) or not input_validator.is_valid_number(topicid) or not input_validator.is_valid_points(points):
        return jsonify({'error': 'Invalid id'}), 400

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

@app.route('/get_lesson_status/<int:userid>/<int:topicid>', methods=['GET'])
@jwt_required()
def get_lesson_status(userid, topicid):
    conn = None
    cursor = None

    if not input_validator.is_valid_number(userid):
        return jsonify({'error': 'Invalid userid'}), 400

    if not input_validator.is_valid_number(topicid):
        return jsonify({'error': 'Invalid topicid'}), 400

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
@jwt_required()
def complete_lesson():
    conn = None
    cursor = None

    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    userid = data.get('userid')
    topicid = data.get('topicid')

    if not input_validator.is_valid_number(userid):
        return jsonify({'error': 'Invalid userid'}), 400

    if not input_validator.is_valid_number(topicid):
        return jsonify({'error': 'Invalid topicid'}), 400

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
