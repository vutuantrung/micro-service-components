"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const wss = new ws_1.default.Server({ port: 8080 });
const clients = new Set();
wss.on("connection", (ws) => {
    console.log("New client connected");
    clients.add(ws);
    console.log("[ws]", ws);
    wss.on("message", (message) => {
        console.log("Received message:", message);
        ws.send("Server received your message:" + message);
    });
    wss.on("close", () => {
        console.log("Client disconnected");
        clients.delete(ws);
    });
});
