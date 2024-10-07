const express = require('express');

const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 5000;

// Middleware


// PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    password: "d1QVQlVnkfeULGNe",
    host: 'lazily-forgiving-hairtail.data-1.use1.tembo.io',
    port: '5432',
    database: 'postgres',
    idleTimeoutMillis: 30000,
});

pool.connect()
    .then(client => {
        return client.query('SELECT * FROM users')
        .then(res => {
            console.log('Current time: ', res.rows[0].now);
            client.release();
        })
    })
    .catch(err => console.error('Error connecting to the database', err.stack));



// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
