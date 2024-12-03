import pytest
from flask import Flask
from unittest.mock import patch, MagicMock
import sys
import os

# Add the root directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../backend/api')))

# Now you can import app from server.py
from server import app
from flask_jwt_extended import create_access_token

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

@patch('psycopg2.connect')
def test_get_users(mock_connect, client):
    mock_cursor = MagicMock()
    mock_cursor.fetchall.return_value = [
        (1, 'testuser', 'hashedpassword', False, True, 'test@example.com')
    ]
    mock_conn = MagicMock()
    mock_conn.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_conn

    response = client.get('/api/users')
    assert response.status_code == 200
    assert response.json == [
        {
            'id': 1,
            'username': 'testuser',
            'password': 'hashedpassword',
            'admin': False,
            'subscribe': True,
            'email': 'test@example.com',
        }
    ]

    mock_cursor.close.assert_called_once()
    mock_conn.close.assert_called_once()

@pytest.fixture
def login_and_get_token(client):
    # Simulate signing up or create a user in the test database (mocked for simplicity)
    username = "cooltest"
    password = "1234"

    # Login to obtain a JWT
    response = client.post('/api/login', json={
        "username": username,
        "password": password
    })

    assert response.status_code == 200
    return response.json["access_token"]  # Return the token

@patch('psycopg2.connect')
def test_get_total_lessons_with_login(mock_connect, client, login_and_get_token):
    # Mock the database connection and cursor
    mock_cursor = MagicMock()
    mock_cursor.fetchone.return_value = (10,)  # Mock total lessons count
    mock_conn = MagicMock()
    mock_conn.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_conn

    # Use the token obtained from the login fixture
    token = login_and_get_token
    headers = {
        'Authorization': f'Bearer {token}'
    }

    # Make the authenticated request
    response = client.get('/get_total_lessons', headers=headers)

    # Assert the response
    assert response.status_code == 200
    assert response.json == {"total_lessons": 10}

@patch('psycopg2.connect')
def test_bad_login(mock_connect, client):
    # Mock the database connection
    mock_cursor = MagicMock()
    mock_conn = MagicMock()
    mock_cursor.fetchone.return_value = None  # Simulate a user not found or incorrect credentials
    mock_conn.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_conn

    # Perform login
    login_response = client.post('/api/login', json={
        "username": "cooltest",
        "password": "wrongpassword"
    })

    assert login_response.status_code == 401  # Assuming incorrect login returns 401 Unauthorized





