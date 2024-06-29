"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.js
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const redis_1 = require("redis");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const redisClient = (0, redis_1.createClient)({
    socket: {
        host: "127.0.0.1",
        port: 6379,
    },
});
app.get("/", (req, res) => {
    res.send("Express TypeScript Server");
});
app.get("/testRedis", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!redisClient.isOpen) {
            yield redisClient
                .connect()
                .then(() => { })
                .catch((e) => console.log(e));
        }
        console.time("LOG_TIME");
        const photosRedisKey = "user:photos";
        const value = yield redisClient.get(photosRedisKey);
        if (value) {
            console.timeEnd("LOG_TIME");
            return res.json({ status: 200, data: JSON.parse(value) });
        }
        // Fetch directly from remote api
        fetch("https://jsonplaceholder.typicode.com/photos")
            .then((response) => response.json())
            .then((photos) => __awaiter(void 0, void 0, void 0, function* () {
            // Save the  API response in Redis store,  data expire time in 3600 seconds, it means one hour
            yield redisClient.setEx(photosRedisKey, 3600, JSON.stringify(photos));
            // Send JSON response to client
            console.timeEnd("LOG_TIME");
            return res.json({ status: 200, data: photos });
        }))
            .catch((error) => {
            console.log(error);
            // send error to the client
            return res.json(error.toString());
        });
    }
    catch (error) {
        return res.status(500);
    }
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
