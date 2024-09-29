import express from "express";
import checkToken from "../../middlewares/api/checkToken.js";

const app = express();
const router = express.Router();

import spotify from "./spotify.js";
router.use("/spotify" , spotify);

import chat from "./chat.js";
router.use("/chat" , chat);

export default router;