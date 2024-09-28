import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
});

// Event listeners for Redis
redisClient.on('connect', () => {
    console.log('Connected to Redis...');
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

// Connect to Redis
(async () => {
    try {
        await redisClient.connect();
        console.log('Redis client connected successfully.');
    } catch (error) {
        console.error('Could not connect to Redis:', error);
    }
})();

export default redisClient;
