# amicooked

This project is intended for course COMP 7082 of Fall 2024. It uses React JS for the front-end, and Flask, Express JS for back-end with Postgresql.

## Description
amicooked is a web application that utilizes micro services to support its features. Such features like: login/signup, educational materials, community forum, news letter, and privacy checkers.

## Installation
Prior to the listed installations, Node JS must be installed on your local machine. You can install Node JS [here](https://nodejs.org/en/).

amicooked web application and micro services are built using a variety of node modules and react libraries. Here is how to install them:

Run the following commands:
```
# 1st Backend
cd backend
npm install

# 2nd Backend
cd hibp
npm install

# Frontend
cd ../../frontend
npm install
```


## Build & Run Locally

### Micro services
There are four total micro services available for internal and external uses. Here is how to run them:

On the first terminal: 

```
cd backend
python server.py
```
On the second terminal: 

```
cd backend/hibp
node app.js
```



### Web application
Once the backends are up and running. You can start building and running the web application. Here is how to do so:

On the third terminal:

```
cd frontend
npm run build
npm start
```

*Happy cooking!*