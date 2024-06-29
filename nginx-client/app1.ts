// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
console.log("from mongodb-client");
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hey Buddy! Your request is processed by Server 1\n");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

// pm2 start ./app1.js ./app2.js ./app3.js
