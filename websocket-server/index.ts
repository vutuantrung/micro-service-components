import WebSocket from "ws";

const wss = new WebSocket.Server({ port: 8080 });

const clients = new Set();

wss.on("connection", (ws: WebSocket) => {
    console.log("New client connected");
    clients.add(ws);

    wss.on("message", (message: string) => {
        console.log("Received message:", message);
        ws.send("Server received your message:" + message);
    });

    wss.on("close", () => {
        console.log("Client disconnected");
        clients.delete(ws);
    });
});
