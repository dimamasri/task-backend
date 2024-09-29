import 'dotenv/config';
import express from 'express';
import DBconnect from './database.js';

DBconnect();
const app = express();
const port = process.env.PORT;
app.use(express.json());

import ReturnResponse from "./middlewares/api/return-response.js";
import api from "./routes/api/_root.js";
app.use("/api", api, ReturnResponse);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});