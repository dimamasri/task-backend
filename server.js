require('dotenv').config();
const express = require('express');
const redis = require('redis');

const app = express();
const port = 3000;

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});