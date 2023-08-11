import io from 'socket.io-client'

const socket = io('http://localhost:3000')

document.getElementById('sendButton')?.addEventListener('click', () => {
  const messageInput = document.getElementById(
    'messageInput'
  ) as HTMLInputElement
  const message = messageInput.value
  socket.emit('message', message)
  messageInput.value = ''
})

socket.on('message', (data: string) => {
  const messages = document.getElementById('messages')
  if (messages) {
    const li = document.createElement('li')
    li.textContent = data
    messages.appendChild(li)
  }
})
