import express from "express";
import handler from "../../middlewares/shared/handler.js";
import { body } from 'express-validator';
import { chat, history } from "../../controllers/api/chat.js";

const router = express.Router();

router.post(
    "/",
    body("artistId")
        .notEmpty()
        .withMessage("The artistID field is required")
        .bail(),
    body("message")
        .notEmpty()
        .withMessage("The message field is required")
        .isString()
        .withMessage("The message must be a string")
        .isLength({ min: 1 })
        .withMessage("The message must be at least 1 character long")
        .bail(),
    chat
);



router.post(
    "/history",
    body("artistId")
        .notEmpty()
        .withMessage("The artistID field is required")
        .bail(),
    body("message")
        .notEmpty()
        .withMessage("The message field is required")
        .isString()
        .withMessage("The message must be a string")
        .isLength({ min: 1 })
        .withMessage("The message must be at least 1 character long")
        .bail(),
    handler(history)
);
export default router;