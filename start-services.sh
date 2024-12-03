#!/bin/bash

# Function to handle cleanup on termination
function cleanup() {
    echo "Stopping all services..."
    # Kill all background jobs
    kill $(jobs -p) 2>/dev/null
    wait $(jobs -p) 2>/dev/null
    echo "All services stopped."
    exit 0
}

# Trap SIGINT (Ctrl+C) and call cleanup
trap cleanup SIGINT

# Function to check for errors
function check_error() {
    if [ $? -ne 0 ]; then
        echo "Error occurred in $1. Exiting..."
        cleanup
    fi
}

# Start Front-End
echo "Starting Front-End..."
(cd ./frontend/src && npm install && npm start) > frontend.log 2>&1 &
check_error "Front-End"

# Start Back-End
echo "Starting Back-End"
(cd ./backend/api && python3 -m venv venv && source venv/bin/activate && pip install -r ../requirements.txt && python3 ./server.py) > backend.log 2>&1 &
check_error "Back-End"

# Start Community Forums
echo "Starting Community Forums"
(cd ./backend/community-forums && python3 -m venv venv && source venv/bin/activate && pip install psycopg2 && python3 setup_db.py npm install && node server.js) > community-forums.log 2>&1 &
check_error "Community Forums"

# Start Compromised Checker
echo "Starting Pwnd Password, Email, and Website Checker"
(cd ./backend/hibp && npm install && node app.js) > hibp.log 2>&1 &
check_error "Compromised Checker"

# Start News Letter Notification
echo "Starting News Letter Notification"
(cd ./newsletter-service && python3 -m venv venv && source venv/bin/activate && pip install -r ./requirements.txt && python3 newsletter_runner.py) > newsletter.log 2>&1 &
check_error "News Letter Notification"

# Keep the script running to monitor services
echo "All services started successfully! Press Ctrl+C to stop all services."
wait
