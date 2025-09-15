require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');

const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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

    socket.emit('welcome-message', {
        user: 'System',
        message: 'Welcome to the chat! To use the bot, start your message with @bot.'
    });

    socket.on('new-user-joined', (name) => {
        socket.username = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('message', async (msg) => {
        socket.broadcast.emit('message', msg);

        if (msg.message.toLowerCase().startsWith('@bot')) {
            try {
                const prompt = msg.message.substring(4).trim();
                const result = await model.generateContent(prompt);
                const response = await result.response;
                const text = response.text();
                const botMsg = {
                    user: 'Bot',
                    message: text
                };
                io.emit('message', botMsg);
            } catch (error) {
                console.error("Error calling Gemini API:", error);
                io.emit('message', { user: 'Bot', message: 'Sorry, I had trouble thinking of a response.' });
            }
        }
    });

    socket.on('disconnect', () => {
        if (socket.username) {
            socket.broadcast.emit('user-left', socket.username);
        }
    });
});
