import logging
from api_connection.authentication import get_access_token, get_subscribers
from emailer.mailjet import main as mailjet_main
from rss_scraper.rss import main as rss_main

logging.basicConfig(
    filename='newsletter.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
)


def main():
    subscribers = None

    try:
        # run the rss scraper
        logging.info("Starting RSS scraper...")
        rss_main('./rss_scraper/rss_config.json', './rss_scraper/results.json')
        logging.info("RSS scraper finished.")

        # get the access token
        logging.info("Getting access token...")
        access_token = get_access_token()

        if not access_token:
            logging.error("Failed to retrieve access token.")
            return

        logging.info("Access token retrieved successfully.")

        # get subscribers with the access token
        logging.info("Fetching subscribers...")
        subscribers = get_subscribers(access_token)

        if not subscribers:
            logging.error("No subscribers found.")
            return

        logging.info(f"Found {len(subscribers)} subscribers.")

        # Send the emails via Mailjet
        logging.info("Sending emails to subscribers...")
        mailjet_main(subscribers)
        logging.info("Emails sent successfully.")

    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")


if __name__ == '__main__':
    main()
