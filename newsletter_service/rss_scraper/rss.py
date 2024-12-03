import feedparser
import json
import re
import ssl
from urllib import request
from datetime import datetime

def load_config(rss_config_file):
    with open(rss_config_file, 'r') as file:
        return json.load(file)


def fetch_rss(feed_url):
    context = ssl.create_default_context()
    context.check_hostname = False
    context.verify_mode = ssl.CERT_NONE

    return feedparser.parse(feed_url, handlers=[request.HTTPSHandler(context=context)])


def search_keywords(feed, keywords):
    results = []
    for entry in feed.entries:
        title = entry.get('title', '')
        summary = entry.get('summary', '')
        for keyword in keywords:
            if re.search(rf'\b{keyword}\b', title, re.IGNORECASE) or re.search(rf'\b{keyword}\b', summary, re.IGNORECASE):
                results.append({
                    'title': title,
                    'link': entry.get('link', ''),
                    'published': entry.get('published', ''),
                    'summary': summary,
                    'keyword': keyword
                })
    return results


def main(config_file, output_file):
    config = load_config(config_file)
    rss_feeds = config.get("rss_feeds", [])
    keywords = config.get("keywords", [])

    all_results = []

    for feed_url in rss_feeds:
        feed = fetch_rss(feed_url)
        results = search_keywords(feed, keywords)
        all_results.extend(results)

    with open(output_file, 'w') as outfile:
        json.dump({
            'timestamp': datetime.now().isoformat(),
            'results': all_results
        }, outfile, indent=4)


if __name__ == "__main__":
    main('rss_config.json', 'results.json')