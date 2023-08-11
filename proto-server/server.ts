import express from 'express'
import { Server, Socket } from 'socket.io'
import * as http from 'http'
import cors from 'cors'

const app = express()
app.use(cors({ origin: 'http://127.0.0.1:3000' }))
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  next()
})
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://127.0.0.1:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

io.on('connection', (socket: Socket) => {
  console.log('A user connected')

  socket.on('message', (data: string) => {
    console.log('Received message:', data)
    io.emit('message', data) // Broadcast the message to all connected clients
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
