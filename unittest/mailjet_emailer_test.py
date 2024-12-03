import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'newsletter_service')))

from datetime import datetime
from unittest import TestCase
import json
from unittest.mock import patch
import unittest
from unittest.mock import patch, mock_open, MagicMock
from newsletter_service.emailer.mailjet import load_results, generate_email_content

ARTICLES_TO_SEND = 5

class RSSFeedTest(unittest.TestCase):
    def setUp(self):
        self.results = [
            {
                "title": "Title 1",
                "link": "https://example.com/1",
                "summary": "Summary 1",
                "keyword": "keyword1"
            },
            {
                "title": "Title 2",
                "link": "https://example.com/2",
                "summary": "Summary 2",
                "keyword": "keyword2"
            },
            {
                "title": "Title 3",
                "link": "https://example.com/3",
                "summary": "Summary 3",
                "keyword": "keyword3"
            }
        ]

    @patch('builtins.open', new_callable=mock_open)
    def test_load_results_success(self, mock_file):
        mock_data = {'results': self.results}
        mock_file.return_value.read.return_value = json.dumps(mock_data)

        results = load_results('results.json')

        mock_file.assert_called_with('results.json', 'r')

        self.assertEqual(len(results), 3)
        self.assertEqual(results[0]['title'], "Title 1")
        self.assertEqual(results[0]['keyword'], "keyword1")
        self.assertEqual(results[0]['link'], "https://example.com/1")

    @patch('newsletter_service.emailer.mailjet.datetime')
    def test_generate_email_content(self, mock_datetime):
        mock_datetime.now.return_value = datetime(2024, 11, 25)

        text_content, html_content = generate_email_content(self.results)
        current_date = "2024-11-25"

        self.assertIn(f"amicooked {current_date}", html_content)
        self.assertIn("<h3 style='font-family: Helvetica, sans-serif;'><a href='https://example.com/1'",
                      html_content)
        self.assertIn("Summary 1", html_content)
        self.assertIn("Title 1", text_content)
        self.assertIn("Summary 1", text_content)
        self.assertIn("Link: https://example.com/1", text_content)

    def test_limit_articles(self):
        results = self.results + [
            {
                "title": "Title 4",
                "link": "https://example.com/4",
                "summary": "Summary 4",
                "keyword": "keyword4"
            },
            {
                "title": "Title 5",
                "link": "https://example.com/5",
                "summary": "Summary 5",
                "keyword": "keyword5"
            },
            {
                "title": "Title 6",
                "link": "https://example.com/6",
                "summary": "Summary 6",
                "keyword": "keyword6"
            }
        ]

        text_content, html_content = generate_email_content(results)

        self.assertEqual(text_content.count("Title"), ARTICLES_TO_SEND)
        self.assertEqual(
            html_content.count("<h3 style='font-family: Helvetica, sans-serif;'><a href='https://example.com/"),
            ARTICLES_TO_SEND)


    @patch('newsletter_service.emailer.mailjet.datetime')
    def test_generate_email_content_with_mocked_date(self, mock_datetime):
        mock_datetime.now.return_value = datetime(2024, 11, 25)
        mock_datetime.side_effect = lambda *args, **kw: datetime(*args, **kw)

        text_content, html_content = generate_email_content(self.results)

        self.assertIn("amicooked 2024-11-25", html_content)


if __name__ == '__main__':
    unittest.main()
