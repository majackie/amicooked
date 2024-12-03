-- Sample Users
INSERT INTO users (id, name, email) VALUES
(1, 'Alice Johnson', 'alice@example.com'),
(2, 'Bob Smith', 'bob@example.com'),
(3, 'Carol White', 'carol@example.com');

-- Sample Posts
INSERT INTO posts (user_id, title, content) VALUES
-- Posts by Alice on Cybersecurity
(1, 'Understanding Phishing Attacks', 'Phishing attacks are becoming more sophisticated. Here’s how to recognize them and protect yourself.'),
(1, 'Why Multi-Factor Authentication Matters', 'MFA adds a layer of security beyond just passwords. Here’s why it’s essential in today’s digital world.'),
(1, 'Top 5 Tools for Cybersecurity Enthusiasts', 'For those interested in cybersecurity, here are five tools to get started: Nmap, Wireshark, Metasploit, and more.'),

-- Posts by Bob on Privacy
(2, 'The Importance of Data Encryption', 'Data encryption is crucial for protecting personal information online. Learn how it works and why you should care.'),
(2, 'How to Use a VPN for Privacy', 'VPNs can help protect your privacy by masking your IP address. Here’s a guide to getting started.'),
(2, 'Privacy Risks of Social Media', 'Social media platforms collect a lot of data. Here’s what you should know to protect your privacy.'),

-- Posts by Charlie on General Tech
(3, 'Understanding Cloud Security', 'As more data moves to the cloud, understanding cloud security is vital for protecting information.'),
(3, 'Secure Your Smart Home', 'With smart home devices on the rise, securing them from potential hacks is essential. Here’s how.'),
(3, 'Emerging Threats in IoT Security', 'The Internet of Things (IoT) brings convenience but also security risks. Stay informed about the latest threats.'),
(3, 'The Future of AI in Cybersecurity', 'AI is becoming a tool in cybersecurity for threat detection. Here’s how it’s changing the field.');
