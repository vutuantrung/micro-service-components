// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const redisClient = createClient({
    socket: {
        host: "127.0.0.1",
        port: 6379,
    },
});

app.get("/", (req: Request, res: Response) => {
    res.send("Express TypeScript Server");
});

app.get("/testRedis", async (req: Request, res: Response) => {
    try {
        if (!redisClient.isOpen) {
            await redisClient
                .connect()
                .then(() => {})
                .catch((e) => console.log(e));
        }
        console.time("LOG_TIME");
        const photosRedisKey = "user:photos";
        const value = await redisClient.get(photosRedisKey);
        if (value) {
            console.timeEnd("LOG_TIME");
            return res.json({ status: 200, data: JSON.parse(value) });
        }

        // Fetch directly from remote api
        fetch("https://jsonplaceholder.typicode.com/photos")
            .then((response) => response.json())
            .then(async (photos) => {
                // Save the  API response in Redis store,  data expire time in 3600 seconds, it means one hour
                await redisClient.setEx(
                    photosRedisKey,
                    3600,
                    JSON.stringify(photos)
                );

                // Send JSON response to client
                console.timeEnd("LOG_TIME");
                return res.json({ status: 200, data: photos });
            })
            .catch((error) => {
                console.log(error);
                // send error to the client
                return res.json(error.toString());
            });
    } catch (error: any) {
        return res.status(500);
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
