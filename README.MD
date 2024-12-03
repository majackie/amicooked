# amicooked

This project is intended for course COMP 7082 of Fall 2024. It uses React JS for the front end and Flask, Express JS for the back end with Postgresql. This project has also been set up with Git Action for automatic unit tests.

## Description
amicooked is a web application that utilizes microservices to support its features. Such features like login/signup, educational materials, community forum, newsletter, and privacy checkers.

## Installation
Prior to the listed installations, Node JS must be installed on your local machine. You can install Node JS [here](https://nodejs.org/en/).

amicooked's web application and microservices are built using a variety of node modules and react libraries. Here is how to install them:

Run the following commands:
```
# 1st Backend
cd backend
npm install
python -m pip install --upgrade pip
pip install -r requirements.txt

# 2nd Backend
cd hibp
npm install

# Frontend
cd ../../frontend
npm install
```


## Build & Run Locally

### Run amicooked Completely
We have created a shell script to help run all microservices, and the web application simultaneously. Here is how to run it:

In the root directory, open up a terminal:
```
./start-services.sh
```

### Run Microservices Independently
There are four total microservices available for internal and external uses. Here is how to run them independently:

On two separate terminals, run: 

```
cd backend
python server.py
```
And

```
cd backend/hibp
node app.js
```

### Run Web application Independently
You can also build and run the web application independently. Here is how to do so:

On a separate terminal, run:

```
cd frontend
npm run build
npm start
```

*Happy cooking!*
