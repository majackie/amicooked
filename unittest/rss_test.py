import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from newsletter_service.rss_scraper.rss import load_config, fetch_rss, search_keywords, main
import json
import unittest
from unittest.mock import patch, mock_open, MagicMock, ANY
import ssl
import feedparser
from datetime import datetime
import re


class RSSFeedTest(unittest.TestCase):
    def setUp(self):
        self.config_data = {
            "rss_feeds": ["https://example.com/rss1", "https://example.com/rss2"],
            "keywords": ["keyword1", "keyword2"]
        }

        self.sample_feed = MagicMock()
        self.sample_feed.entries = [
            {
                'title': 'Title 1 keyword1',
                'summary': 'Summary of article 1 with keyword1',
                'link': 'https://example.com/1',
                'published': '2024-12-01'
            },
            {
                'title': 'Title 2 keyword2',
                'summary': 'Summary of article 2 with keyword2',
                'link': 'https://example.com/2',
                'published': '2024-12-02'
            }
        ]

        self.results = [
            {
                "title": "Title 1 keyword1",
                "link": "https://example.com/1",
                "published": "2024-12-01",
                "summary": "Summary of article 1 with keyword1",
                "keyword": "keyword1"
            },
            {
                "title": "Title 2 keyword2",
                "link": "https://example.com/2",
                "published": "2024-12-02",
                "summary": "Summary of article 2 with keyword2",
                "keyword": "keyword2"
            }
        ]

    def test_load_config(self):
        with patch('builtins.open', new_callable=mock_open) as mock_file:
            mock_file.return_value.read.return_value = json.dumps(self.config_data)

            config = load_config('config.json')

            mock_file.assert_called_with('config.json', 'r')
            self.assertEqual(config['rss_feeds'], self.config_data['rss_feeds'])
            self.assertEqual(config['keywords'], self.config_data['keywords'])

    def test_fetch_rss(self):
        with patch('newsletter_service.rss_scraper.rss.feedparser.parse', return_value=self.sample_feed) as mock_parse:
            feed = fetch_rss('https://example.com/rss1')

            self.assertEqual(len(feed.entries), 2)
            self.assertEqual(feed.entries[0]['title'], 'Title 1 keyword1')

    def test_search_keywords(self):
        keywords = ['keyword1', 'keyword2']
        results = search_keywords(self.sample_feed, keywords)

        self.assertEqual(len(results), 2)
        self.assertEqual(results[0]['keyword'], 'keyword1')
        self.assertEqual(results[1]['keyword'], 'keyword2')
        self.assertIn('keyword1', results[0]['summary'])
        self.assertIn('keyword2', results[1]['title'])

    def test_search_keywords_with_regex(self):
        feed_with_special_chars = MagicMock()
        feed_with_special_chars.entries = [
            {
                'title': 'Breaking News: keyword1 found!',
                'summary': 'This is the summary with keyword1.',
                'link': 'https://example.com/1',
                'published': '2024-12-01'
            },
            {
                'title': 'Important Update on keyword2',
                'summary': 'This is the summary with keyword2.',
                'link': 'https://example.com/2',
                'published': '2024-12-02'
            }
        ]

        keywords = ['keyword1', 'keyword2']
        results = search_keywords(feed_with_special_chars, keywords)

        self.assertEqual(len(results), 2)
        self.assertEqual(results[0]['keyword'], 'keyword1')
        self.assertEqual(results[1]['keyword'], 'keyword2')


if __name__ == '__main__':
    unittest.main()
