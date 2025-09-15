const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Socket.IO setup
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('A user connected...');

    socket.on('new-user-joined', (name) => {
        socket.username = name;
        socket.broadcast.emit('user-joined', name);
    });

    // When a message is received, broadcast the original message object to ALL clients
    socket.on('message', (msg) => {
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        if (socket.username) {
            socket.broadcast.emit('user-left', socket.username);
        }
    });
});