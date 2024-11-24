import psycopg2
import os
from psycopg2 import sql
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

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
                'admin': user_record[3], # Assuming second column is Name
                'subscribe': user_record[4],
                'email': user_record[5]
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
    subscribe = data.get("subscribe", False)
    email = data.get("email")
    
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
            "INSERT INTO users (username, password, admin, subscribe, email) VALUES (%s, %s, %s, %s, %s) RETURNING userid;",
            (username, hashed_password, False, subscribe, email)
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
            access_token = create_access_token(identity=user_record[0])
            return jsonify(access_token=access_token), 200
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
        

@app.route('/lesson/<int:id>', methods=['GET'])
def get_lesson(id):
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

    return jsonify(lesson_data)  # Return users as JSON


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

if __name__ == '__main__':
    app.run(debug=True)
