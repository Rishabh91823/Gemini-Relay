const socket = io();

let textarea = document.querySelector('#chat_box');
let messageArea = document.querySelector('.chatarea');
let name;

do {
    name = prompt('Please enter your name: ');
} while (!name);

socket.emit('new-user-joined', name);

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && e.target.value.trim().length > 0) {
        sendMessage(e.target.value);
    }
});

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    };

    appendMessage(msg, 'outgoing_msg');
    scrollToBottom();

    socket.emit('message', msg);
    textarea.value = '';
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    mainDiv.classList.add(type);

    let markup = `
        <p>${msg.message}</p>
        <h5>From: ${msg.user}</h5>
    `;

    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

function appendNotification(message) {
    let notificationDiv = document.createElement('div');
    notificationDiv.classList.add('notification');
    notificationDiv.innerText = message;
    messageArea.appendChild(notificationDiv);
    scrollToBottom();
}

socket.on('welcome-message', (msg) => {
    appendMessage(msg, 'incoming_msg');
    scrollToBottom();
});

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming_msg');
    scrollToBottom();
});

socket.on('user-joined', (userName) => {
    appendNotification(`${userName} has joined the chat`);
});

socket.on('user-left', (userName) => {
    appendNotification(`${userName} has left the chat`);
});

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}
