"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.js
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
console.log("from mongodb-client");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3002;
app.get("/", (req, res) => {
    res.send("Hey Buddy! Your request is processed by Server 3\n");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
