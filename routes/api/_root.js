import express from "express";
import checkToken from "../../middlewares/api/checkToken.js";

const app = express();
const router = express.Router();

import spotify from "./spotify.js";
router.use("/spotify" , spotify);

export default router;