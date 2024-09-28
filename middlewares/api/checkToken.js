import axios from 'axios';
import redisClient from '../../redis.js';
import https from 'https';

const agent = new https.Agent({
    rejectUnauthorized: false, 
});
const checkToken = async (req, res, next) => {
    try {
        // Fetch cached token
        const cachedToken = await redisClient.get('spotifyToken');

        if (cachedToken) {
            console.log('Using cached token:', cachedToken);
            req.token = cachedToken;
            return next();
        } else {
            console.log(`${process.env.SPOTIFY_ACCOUNTS_URL}`);
            const response = await axios.post(`https://accounts.spotify.com/api/token`, new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                httpsAgent: agent,
            });
            const { access_token } = response.data;
            req.token = access_token;

            // Set token in Redis with expiration
            await redisClient.setEx('spotifyToken', 3600, access_token);
            return next();
        }
    } catch (error) {
        console.error('Error in middleware:', error);
        return res.status(500).send('Error fetching token from Spotify');
    }
};

export default checkToken;
