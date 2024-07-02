const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*"
    }
});

io.on('connection', (socket) => {
    console.log('Socket is live');

    socket.on("chat", (payload) => {
        console.log("Received payload:", payload);
        
        // Add a timestamp to the payload
        payload.timestamp = new Date().toLocaleTimeString();

        // Emit the payload with the timestamp to all clients
        io.emit("chat", payload);
    });
});

server.listen(5000, () => console.log('Server is listening at port 5000'));
