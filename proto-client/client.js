var _a;
import io from 'socket.io-client';
const socket = io('http://localhost:3000');
(_a = document.getElementById('sendButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    socket.emit('message', message);
    messageInput.value = '';
});
socket.on('message', (data) => {
    const messages = document.getElementById('messages');
    if (messages) {
        const li = document.createElement('li');
        li.textContent = data;
        messages.appendChild(li);
    }
});
