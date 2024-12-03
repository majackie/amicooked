import pytest
from flask import Flask
from unittest.mock import patch, MagicMock
import sys
import os

# Add the root directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../backend/api')))
sys.path.append('../backend/api')
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

@patch('psycopg2.connect')
def test_get_lesson(mock_connect, client, login_and_get_token):
    mock_cursor = MagicMock()
    mock_cursor.fetchone.return_value = (1, "Phishing email", "<h3>What is phishing?</h3><p>Phishing is an attempt to steal personal information or break into online accounts using deceptive emails, messages, ads, or sites that look similar to sites you already use. For example, a phishing email might look like it's from your bank and request private information about your bank account.</p><p>Phishing messages or content may: </p><ul><li>Ask for your personal or financial information.</li><li>Ask you to click links or download software.</li><li>Impersonate a reputable organization, like your bank, a social media site you use, or your workplace.</li><li>Impersonate someone you know, like a family member, friend, or coworker.</li><li>Look exactly like a message from an organization or person you trust.</li></ul><h3>What to look for?</h3><p>Detecting phishing emails can be challenging, as they are increasingly sophisticated. Here are key signs to look for to help you recognize and avoid them:</p><ol><b><li>Check the Sender’s Email Address</li></b><ul><li>Often, phishing emails come from addresses that look similar to legitimate ones but have subtle differences (e.g., support@pay-pal.com instead of support@paypal.com).</li><li>Hover over the sender's name to reveal the actual email address; if it doesn’t match the official domain, be cautious.</li></ul><b><li>Look for Poor Grammar and Spelling</li></b><ul><li>Many phishing emails contain grammatical errors, awkward phrasing, or typos, as they are often sent from non-native English speakers or hastily crafted.</li></ul><b><li>Sense of Urgency or Threats</li></b><ul><li>Phishing emails often create a sense of urgency, warning of account closure, suspicious activity, or other time-sensitive issues to prompt a quick response.</li><li>Example phrases include: \"Your account will be deactivated,\" \"Immediate action required,\" or \"Suspicious login detected.\"</li></ul><b><li>Requests for Personal or Financial Information</li></b><ul><li>Legitimate organizations rarely ask for sensitive information (like passwords, credit card numbers, or Social Security numbers) over email.</li><li>Be wary if asked to click a link to \"confirm\" or \"verify\" personal details.</li></ul><b><li>Suspicious Links or Attachments</li></b><ul><li>Hover over links before clicking. If the URL doesn’t match the legitimate website or looks unusual (e.g., with extra characters or unfamiliar domains), don’t click.</li><li>Attachments, especially unexpected or strangely named ones, can contain malware. Avoid opening them unless you’re sure of the source.</li></ul><b><li>Trust Your Instincts</li></b><ul><li>If something feels off, it probably is. When in doubt, contact the organization directly (using their official website or phone number) instead of interacting with the email.</li></ul></ol>", True)
    mock_conn = MagicMock()
    mock_conn.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_conn

    # Use the token obtained from the login fixture
    token = login_and_get_token
    headers = {
        'Authorization': f'Bearer {token}'
    }

    response = client.get('/lesson/1', headers=headers)
    assert response.status_code == 200
    assert response.json == {
        "topicId": 1,
        "topicName": "Phishing email",
        "topicContent": "<h3>What is phishing?</h3><p>Phishing is an attempt to steal personal information or break into online accounts using deceptive emails, messages, ads, or sites that look similar to sites you already use. For example, a phishing email might look like it's from your bank and request private information about your bank account.</p><p>Phishing messages or content may: </p><ul><li>Ask for your personal or financial information.</li><li>Ask you to click links or download software.</li><li>Impersonate a reputable organization, like your bank, a social media site you use, or your workplace.</li><li>Impersonate someone you know, like a family member, friend, or coworker.</li><li>Look exactly like a message from an organization or person you trust.</li></ul><h3>What to look for?</h3><p>Detecting phishing emails can be challenging, as they are increasingly sophisticated. Here are key signs to look for to help you recognize and avoid them:</p><ol><b><li>Check the Sender’s Email Address</li></b><ul><li>Often, phishing emails come from addresses that look similar to legitimate ones but have subtle differences (e.g., support@pay-pal.com instead of support@paypal.com).</li><li>Hover over the sender's name to reveal the actual email address; if it doesn’t match the official domain, be cautious.</li></ul><b><li>Look for Poor Grammar and Spelling</li></b><ul><li>Many phishing emails contain grammatical errors, awkward phrasing, or typos, as they are often sent from non-native English speakers or hastily crafted.</li></ul><b><li>Sense of Urgency or Threats</li></b><ul><li>Phishing emails often create a sense of urgency, warning of account closure, suspicious activity, or other time-sensitive issues to prompt a quick response.</li><li>Example phrases include: \"Your account will be deactivated,\" \"Immediate action required,\" or \"Suspicious login detected.\"</li></ul><b><li>Requests for Personal or Financial Information</li></b><ul><li>Legitimate organizations rarely ask for sensitive information (like passwords, credit card numbers, or Social Security numbers) over email.</li><li>Be wary if asked to click a link to \"confirm\" or \"verify\" personal details.</li></ul><b><li>Suspicious Links or Attachments</li></b><ul><li>Hover over links before clicking. If the URL doesn’t match the legitimate website or looks unusual (e.g., with extra characters or unfamiliar domains), don’t click.</li><li>Attachments, especially unexpected or strangely named ones, can contain malware. Avoid opening them unless you’re sure of the source.</li></ul><b><li>Trust Your Instincts</li></b><ul><li>If something feels off, it probably is. When in doubt, contact the organization directly (using their official website or phone number) instead of interacting with the email.</li></ul></ol>",
        "isInteractive": True,
    }


@patch('psycopg2.connect')
def test_get_lesson_invalid_id(mock_connect, client, login_and_get_token):
    mock_cursor = MagicMock()
    mock_cursor.fetchall.return_value = () # Mock invalid id response
    mock_conn = MagicMock()
    mock_conn.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_conn

    # Use the token obtained from the login fixture
    token = login_and_get_token
    headers = {
        'Authorization': f'Bearer {token}'
    }

    response = client.get('/lesson/invalid_id', headers=headers)
    assert response.status_code == 404
    

@patch('psycopg2.connect')
def test_get_tips(mock_connect, client, login_and_get_token):
    mock_cursor = MagicMock()
    mock_cursor.fetchall.return_value = [{
        "tipcId": 1,
        "topicId": 1,
        "tipContent": "<b>Check the Sender's Email Address</b><br/> Phishers often use email addresses that resemble legitimate ones. Look closely for small variations, such as extra characters or misspellings.",
    }]
    mock_conn = MagicMock()
    mock_conn.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_conn

    # Use the token obtained from the login fixture
    token = login_and_get_token
    headers = {
        'Authorization': f'Bearer {token}'
    }

    response = client.get('/tips/1', headers=headers)
    assert response.status_code == 200
    assert response.json == [{
        "tipcId": 1,
        "topicId": 1,
        "tipContent": "<b>Check the Sender's Email Address</b><br/> Phishers often use email addresses that resemble legitimate ones. Look closely for small variations, such as extra characters or misspellings.",
    }]
    

@patch('psycopg2.connect')
def test_get_tip_invalid_id(mock_connect, client, login_and_get_token):
    mock_cursor = MagicMock()
    mock_cursor.fetchall.return_value = () # Mock invalid id response
    mock_conn = MagicMock()
    mock_conn.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_conn

    # Use the token obtained from the login fixture
    token = login_and_get_token
    headers = {
        'Authorization': f'Bearer {token}'
    }

    response = client.get('/tips/invalid_id', headers=headers)
    assert response.status_code == 404

@patch('psycopg2.connect')
def test_get_score(mock_connect, client, login_and_get_token):
    # Mock the database connection and cursor
    mock_cursor = MagicMock()
    mock_cursor.fetchone.return_value = (300,)  # Mock gotten score
    mock_conn = MagicMock()
    mock_conn.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_conn

    # Use the token obtained from the login fixture
    token = login_and_get_token
    headers = {
        'Authorization': f'Bearer {token}'
    }

    # Make the authenticated request
    response = client.get('/get_score/21', headers=headers)

    # Assert the response
    assert response.status_code == 200
    assert response.json == {"total_points": 300}

@patch('psycopg2.connect')
def test_get_score_invalid_id(mock_connect, client, login_and_get_token):
    # Mock the database connection and cursor
    mock_cursor = MagicMock()
    mock_cursor.fetchone.return_value = ()  # Mock invalid id response
    mock_conn = MagicMock()
    mock_conn.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_conn

    # Use the token obtained from the login fixture
    token = login_and_get_token
    headers = {
        'Authorization': f'Bearer {token}'
    }

    # Make the authenticated request
    response = client.get('/get_score/invalid_id', headers=headers)

    # Assert the response
    assert response.status_code == 404

@patch('psycopg2.connect')
def test_get_score_no_auth(mock_connect, client):
    # Mock the database connection and cursor
    mock_cursor = MagicMock()
    mock_cursor.fetchone.return_value = () # Mock missing authentication
    mock_conn = MagicMock()
    mock_conn.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_conn

    # Make the unauthenticated request
    response = client.get('/get_score/1')

    # Assert the response
    assert response.status_code == 401

@patch('psycopg2.connect')
def test_update_points(mock_connect, client, login_and_get_token):
    mock_cursor = MagicMock()
    mock_cursor.fetchone.return_value = ("Points updated successfully for userid = {userid}") # Mock successful post request

    mock_conn = MagicMock()
    mock_conn.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_conn

    # Use the token obtained from the login fixture
    token = login_and_get_token
    headers = {
        'Authorization': f'Bearer {token}'
    }

    response = client.post('/update_points', headers=headers, json={
        "userid": 1,
        "topicid": 1,
        "points": 100,
    })
    assert response.status_code == 200
    assert response.json == {"message":"Points updated successfully for userid = {userid}"}

@patch('psycopg2.connect')
def test_get_lesson_status(mock_connect, client, login_and_get_token):
    mock_cursor = MagicMock()
    mock_cursor.fetchone.return_value = (True,) # Mock successful get lesson status response

    mock_conn = MagicMock()
    mock_conn.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_conn

    # Use the token obtained from the login fixture
    token = login_and_get_token
    headers = {
        'Authorization': f'Bearer {token}'
    }

    response = client.get('/get_lesson_status/8/1', headers=headers)
    assert response.status_code == 200
    assert response.json == {"lesson_status":True}

@patch('psycopg2.connect')
def test_get_lesson_status_invalid_userid(mock_connect, client, login_and_get_token):
    mock_cursor = MagicMock()
    mock_cursor.fetchall.return_value = () # Mock invalid userid response

    mock_conn = MagicMock()
    mock_conn.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_conn

    # Use the token obtained from the login fixture
    token = login_and_get_token
    headers = {
        'Authorization': f'Bearer {token}'
    }

    response = client.get('/get_lesson_status/invalid_id/1', headers=headers)
    assert response.status_code == 404

@patch('psycopg2.connect')
def test_get_lesson_status_invalid_topicid(mock_connect, client, login_and_get_token):
    mock_cursor = MagicMock()
    mock_cursor.fetchall.return_value = () # Mock invalid topcid response

    mock_conn = MagicMock()
    mock_conn.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_conn

    # Use the token obtained from the login fixture
    token = login_and_get_token
    headers = {
        'Authorization': f'Bearer {token}'
    }

    response = client.get('/get_lesson_status/8/invalid_id', headers=headers)
    assert response.status_code == 404

@patch('psycopg2.connect')
def test_complete_lesson(mock_connect, client, login_and_get_token):
    mock_cursor = MagicMock()
    mock_cursor.fetchone.return_value = ("Lesson status updated successfully for userid = {userid}") # Mock successful complete lesson response

    mock_conn = MagicMock()
    mock_conn.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_conn

    # Use the token obtained from the login fixture
    token = login_and_get_token
    headers = {
        'Authorization': f'Bearer {token}'
    }

    response = client.post('/complete_lesson', headers=headers, json={
        "userid": 1,
        "topicid": 2,
    })
    assert response.json == {"message":"Lesson status updated successfully for userid = {userid}"}
    assert response.status_code == 200
    
@patch('psycopg2.connect')
def test_complete_lesson_invalid_userid(mock_connect, client, login_and_get_token):
    mock_cursor = MagicMock()
    mock_cursor.fetchone.return_value = ("Invalid userid") # Mock missing userid response

    mock_conn = MagicMock()
    mock_conn.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_conn

       # Use the token obtained from the login fixture
    token = login_and_get_token
    headers = {
        'Authorization': f'Bearer {token}'
    }

    response = client.post('/complete_lesson', headers=headers, json={
        "usrid": 1,
        "topicid": 1
    })
    assert response.status_code == 400
    assert response.json == {"error":"Invalid userid"}

@patch('psycopg2.connect')
def test_complete_lesson_invalid_topicid(mock_connect, client, login_and_get_token):
    mock_cursor = MagicMock()
    mock_cursor.fetchone.return_value = ("Invalid topicid") # Mock missing topic response

    mock_conn = MagicMock()
    mock_conn.cursor.return_value = mock_cursor
    mock_connect.return_value = mock_conn

    # Use the token obtained from the login fixture
    token = login_and_get_token
    headers = {
        'Authorization': f'Bearer {token}'
    }


    response = client.post('/complete_lesson', headers=headers, json={
        "userid": 19,
        "topcid": 2,
    })
    assert response.status_code == 400
    assert response.json == {"error":"Invalid topicid"}