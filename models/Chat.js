import mongoose  from "mongoose";

const chatModel = new mongoose.Schema({
    userId: { type: String, required: true },
    artistId: { type: String, required: true },
    messages: [
        {
            userMessage: String,
            aiResponse: String,
            timestamp: { type: Date, default: Date.now },
        },
    ],
});

const Chat = mongoose.model('Chat', chatModel);

export default Chat;
