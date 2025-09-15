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

const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('A user connected...');

    socket.on('new-user-joined', (name) => {
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    });

    socket.on('disconnect', () => {
         console.log('A user disconnected...');
    });
});