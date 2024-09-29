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
        'hello',
        'lyrics',
        'your',
        'you',
        `${genre}`,
    ];
    if (!keywords.some(keyword => message.toLowerCase().includes(keyword.toLowerCase()))) {
        return res.json({ response: "I'm sorry, but I can only answer questions about the artist and their music." });
    }

    const artistNameLower = artistName.toLowerCase();
    const formattedMessage = message
        .replace(/\byou\b/gi, artistNameLower)
        .replace(/\byour\b/gi, `${artistNameLower}'s`);

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
            candidateCount: 1,
            stopSequences: ["x"],
            maxOutputTokens: 150,
            temperature: 1.0,
        },
    });

    let result = '';
    if (image) {
        let formattedImage = image.replace(/^data:image\/png;base64,/, ""); 
        // const buffer = Buffer.from(formattedImage, 'base64');
        result = await model.generateContent([formattedMessage, formattedImage]);
    } else {
        result = await model.generateContent(formattedMessage);
    }

    const cookies = cookie.parse(req.headers.cookie || '');
    const userId = cookies.userId;

    const responseText = result.response?.text() || "No response";

    await Chat.findOneAndUpdate(
        { userId, artistId },
        { $push: { messages: { userMessage: message, aiResponse: responseText } } },
        { upsert: true, new: true }
    );

    return res.json({ response: responseText });

};

export const history = async (req, res) => {
    const { artistId } = req.body;
    const cookies = cookie.parse(req.headers.cookie || '');
    const userId = cookies.userId;
    const chatHistory = await Chat.findOne({ userId, artistId }).select('messages');
    return chatHistory;
};
