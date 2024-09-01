const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Definindo o diretório público como a raiz do projeto
app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('move', (data) => {
        socket.broadcast.emit('move', data); // Envia para todos os outros clientes
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
