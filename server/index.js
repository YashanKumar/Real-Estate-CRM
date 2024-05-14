
const express = require('express');
const db = require('./db/config');
const route = require('./controllers/route');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5001;
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Setup Express App
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// API Routes
app.use('/api', route);

app.get('/', async (req, res) => {
    res.send('Welcome to my world...');
});

// Get port from environment and store in Express.
const server = app.listen(port, () => {
    const protocol = (process.env.HTTPS === 'true' || process.env.NODE_ENV === 'production') ? 'https' : 'http';
    const { address, port: serverPort } = server.address(); // Renamed 'port' to 'serverPort'
    const host = address === '::' ? '127.0.0.1' : address;
    console.log(`Server listening at ${protocol}://${host}:${serverPort}`);
});

// Connect to MongoDB
const DATABASE_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017';
const DATABASE = process.env.DB || 'Prolink';
db(DATABASE_URL, DATABASE);
