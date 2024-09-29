import express from "express";
import handler from "../../middlewares/shared/handler.js";
import { fetchArtistsByGenre, fetchGenres } from "../../controllers/api/spotify.js";
import checkToken from "../../middlewares/api/checkToken.js";
import { body } from 'express-validator';

const router = express.Router();

router.get("/genres",checkToken, handler(fetchGenres));

router.post(
    "/artists",
    checkToken, 
    body("genre")
    .notEmpty()
    .withMessage("The genre field is required")
    .bail(),
    handler(fetchArtistsByGenre)
);

export default router;