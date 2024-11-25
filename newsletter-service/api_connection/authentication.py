import requests
import json
import os
import logging
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(
    filename='newsletter.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
)

def get_access_token():
    try:
        API_URL = os.getenv('API_URL')
        ADMIN_USER = os.getenv('ADMIN_USER')
        ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD')
        AUTH_URL = f"{API_URL}/api/login"

        payload = {
            'username': ADMIN_USER,
            'password': ADMIN_PASSWORD
        }

        headers = {
            'Content-Type': 'application/json'
        }

        response = requests.post(AUTH_URL, data=json.dumps(payload), headers=headers)

        if response.status_code == 200:
            data = response.json()
            access_token = data.get('access_token')

            if access_token:
                logging.info("Access token received successfully.")
                return access_token
            else:
                logging.error("Access token not found in the response.")
                return None
        else:
            logging.error(f"Failed to authenticate. Status code: {response.status_code}")
            logging.error(f"Response text: {response.text}")
            return None
    except Exception as e:
        logging.error(f"Error in get_access_token: {e}")
        raise


def get_subscribers(access_token):
    try:
        API_URL = os.getenv('API_URL')
        SUBSCRIBERS_URL = f"{API_URL}/api/subscribed_users"

        headers = {
            'Authorization': f'Bearer {access_token}'
        }

        # Send the GET request to the subscribers API
        response = requests.get(SUBSCRIBERS_URL, headers=headers)

        if response.status_code == 200:
            # Successfully received the subscribed users list
            subscribed_users = response.json()
            logging.info(f"Successfully retrieved {len(subscribed_users)} subscribers.")
            return subscribed_users
        else:
            logging.error(f"Failed to get subscribed users. Status code: {response.status_code}")
            logging.error(f"Response text: {response.text}")
            return None
    except Exception as e:
        logging.error(f"Error in get_subscribers: {e}")
        raise

