import 'dotenv/config';
import express from 'express';
import DBconnect from './database.js';
import cors from 'cors';
import bodyParser from 'body-parser';


DBconnect();

const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({ origin: 'http://localhost:3000' }));

import ReturnResponse from "./middlewares/api/return-response.js";
import api from "./routes/api/_root.js";
app.use("/api", api, ReturnResponse);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});