-- Insert data into posts table
INSERT INTO posts (id, username, title, content, created_at) VALUES
(1, 'cyberwarrior101', 'Understanding Two-Factor Authentication', 'Two-Factor Authentication (2FA) adds an extra layer of security to your accounts. Learn why it is essential and how to set it up on various platforms.', '2024-12-01 10:00:00'),
(2, 'privacyguru99', 'The Risks of Public Wi-Fi Networks', 'Using public Wi-Fi can expose your data to hackers. Learn how to protect yourself by using VPNs and other secure practices.', '2024-12-02 15:30:00'),
(3, 'secureme_admin', 'Top Password Management Tools of 2024', 'Explore the best tools available for managing your passwords securely, and say goodbye to reusing weak passwords.', '2024-12-03 08:20:00'),
(4, 'dataprotector45', 'How to Spot Phishing Emails', 'Phishing emails are becoming more sophisticated. Discover how to identify them and protect your personal information.', '2024-12-03 12:45:00');


-- Insert data into comments table
INSERT INTO comments (id, post_id, username, content, created_at) VALUES
(1, 1, 'user123', 'Great explanation of 2FA! I use Google Authenticator and it works perfectly.', '2024-12-01 12:00:00'),
(2, 1, 'techsavvy', 'What do you think about hardware tokens for 2FA?', '2024-12-01 13:15:00'),
(3, 2, 'roadwarrior77', 'Thanks for the tips. I always wondered if using a VPN was worth it!', '2024-12-02 16:00:00'),
(4, 2, 'anonymous', 'Public Wi-Fi is such a trap. Got my data stolen last year.', '2024-12-02 17:45:00'),
(5, 3, 'securitynerd', 'I use LastPass, but heard about a breach recently. Any thoughts?', '2024-12-03 09:00:00'),
(6, 4, 'phishingpro', 'This is a life-saver! I almost fell for a phishing scam last week.', '2024-12-03 13:30:00');