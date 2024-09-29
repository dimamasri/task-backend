import Chat from '../../models/Chat.js';
import cookie from 'cookie';
import { GoogleGenerativeAI } from "@google/generative-ai";
import https from 'https';

const agent = new https.Agent({
    rejectUnauthorized: false,
});

export const chat = async (req, res) => {

    const { message, artistId, artistName, genre, image } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const keywords = [
        `${artistName}`,
        'music',
        'album',
        'song',
        'genre',
        `${genre}`,
    ];
    if (!keywords.some(keyword => message.toLowerCase().includes(keyword.toLowerCase()))) {
        return res.json({ response: "I'm sorry, but I can only answer questions about the artist and their music." });
    }

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
            candidateCount: 1,
            stopSequences: ["x"],
            maxOutputTokens: 100,
            temperature: 1.0,
        },
    });
    
    let result = null;
    if (image)
        result = await model.generateContent([message, image]);
    else
        result = await model.generateContent(message);

    const cookies = cookie.parse(req.headers.cookie || '');
    const userId = cookies.userId;

    const response = result.response.text();

    await Chat.findOneAndUpdate(
        { userId, artistId },
        { $push: { messages: { userMessage: message, aiResponse: response } } },
        { upsert: true, new: true }
    );

    return res.json({ response });

};

export const history = async (req, res) => {
    const { artistId } = req.body;
    const cookies = cookie.parse(req.headers.cookie || '');
    const userId = cookies.userId;
    const chatHistory = await Chat.findOne({ userId, artistId }).select('messages');
    return chatHistory;
};
