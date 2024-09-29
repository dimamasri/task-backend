import https from 'https';
import axios from 'axios';
import redisClient from '../../redis.js';

const agent = new https.Agent({
    rejectUnauthorized: false, 
});
export const fetchGenres = async (req) => {
    const cachedGenres = await redisClient.get('spotifyGenres');
    if (cachedGenres) {
        return JSON.parse(cachedGenres);
    } else {
        const response = await axios.get(`${process.env.SPOTIFY_API_URL}recommendations/available-genre-seeds`, {
            httpsAgent: agent,
            headers: {
                'Authorization': `Bearer ${req.token}`
            }
        });
        redisClient.setEx('spotifyGenres', 3600,  JSON.stringify(response.data));
        return response.data;
    }
};

export const fetchArtistsByGenre = async (req) => {
    const { genre } = req.body; 
    const response = await axios.get(`${process.env.SPOTIFY_API_URL}search`, {
        headers: {
            'Authorization': `Bearer ${req.token}`,
        },
        params: {
            q: `genre:"${genre}"`,
            type: 'artist',
            limit: 20,
        },
        httpsAgent: agent,

    });
    return response.data.artists.items;
}
