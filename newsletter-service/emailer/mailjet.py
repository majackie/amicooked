from datetime import datetime
import mailjet_rest
import json
import os
from dotenv import load_dotenv
import logging

logging.basicConfig(
    filename='newsletter.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
)

load_dotenv()

API_KEY = os.getenv('MAILJET_API_KEY')
API_SECRET = os.getenv('MAILJET_API_SECRET')

# instance of the Mailjet client
mailjet = mailjet_rest.Client(auth=(API_KEY, API_SECRET), version='v3.1')


def load_results(file_path):
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            return data.get('results', [])
    except Exception as e:
        logging.error(f"Error loading results from {file_path}: {e}")
        raise Exception(f"Error loading results: {e}")


def generate_email_content(results, unsubscribe_url):
    current_date = datetime.now().strftime('%Y-%m-%d')
    html_content = f"""
    <html>
        <body>
            <div style="text-align: center; padding-bottom: 20px;">
                <img src="https://s6430.mjt.lu/img2/s6430/5ff10350-1934-4420-9521-0b51c7bd1633/content" alt="Logo" style="max-width: 200px; height: auto;">
                <h3 style="text-align: center; padding font-family: Verdana, sans-serif;">amicooked {current_date}</h3>
            </div>
            <h2 style="font-family: Verdana, sans-serif;">Latest News and Updates:</h2>
    """
    text_content = "Here are the latest news and updates:\n\n"

    for result in results:
        title = result.get('title')
        link = result.get('link')
        summary = result.get('summary')

        html_content += f"<h3 style='font-family: Helvetica, sans-serif;'><a href='{link}' style='color: black; text-decoration: none;'> {title} </a></h3>"
        html_content += f"<p style='font-family: Helvetica, sans-serif;'>{summary}</p>"

        text_content += f"{title}\n{summary}\nLink: {link}\n\n"


    unsubscribe_html = f"<p style='font-family: Helvetica, sans-serif;'>If you no longer wish to receive these emails, please <a href='{unsubscribe_url}' style='color: #ff0000;'>unsubscribe here</a>.</p>"
    unsubscribe_text = f"If you no longer wish to receive these emails, please unsubscribe here: {unsubscribe_url}\n"


    html_content += unsubscribe_html
    text_content += unsubscribe_text


    html_content += "</body></html>"

    return text_content, html_content


def send_email(subscribers, subject, text_part, html_part):
    for user in subscribers:
        data = {
            'Messages': [
                {
                    'From': {
                        'Email': os.getenv('MAILJET_SENDER_EMAIL'),
                        'Name': os.getenv('MAILJET_SENDER_NAME')
                    },
                    'To': [
                        {
                            'Email': user["email"],
                            "Name": user["username"]
                        }
                    ],
                    'Subject':  os.getenv('MAILJET_EMAIL_SUBJECT'),
                    'TextPart': "text_part",
                    'HTMLPart': html_part
                }
            ]
        }

        try:
            result = mailjet.send.create(data=data)
            if result.status_code == 200:
                logging.info(f"Email sent successfully to {user['email']}")
            else:
                logging.error(f"Failed to send email to {user['email']}, Status Code: {result.status_code}")
        except Exception as e:
            logging.error(f"Error sending email to {user['email']}: {e}")
            raise


def main(subscribers):
    results = load_results("./rss_scraper/results.json")

    if results:
        subject = "Latest News and Updates"
        unsubscribe_url = "https://amicooked.me/unsubscribe?email=user@example.com"
        text_part, html_part = generate_email_content(results, unsubscribe_url)

        try:
            send_email(subscribers, subject, text_part, html_part)
        except Exception as e:
            logging.error(f"Failed to send emails: {e}")
    else:
        logging.warning("No results found to send.")

