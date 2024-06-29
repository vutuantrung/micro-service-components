// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
console.log("from mongodb-client");
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3002;

app.get("/", (req: Request, res: Response) => {
    res.send("Hey Buddy! Your request is processed by Server 3\n");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
