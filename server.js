'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

const server = express();

const PORT = process.env.PORT || 3000;
// const client = new pg.Client({ connectionString: process.env.DATABASE_URL,   ssl: { rejectUnauthorized: false } });
server.use(cors());

const locationHandler = require('./modules/location.js');
const weatherHandler = require('./modules/weather.js');

server.get('/location', locationhandler)
server.get('/weather', weatherHandler)




server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})
