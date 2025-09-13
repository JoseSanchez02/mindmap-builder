import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? false : "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

// Middleware
app.use(cors())
app.use(express.json())

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../client/dist')))

// In-memory storage (in production, use a database)
const mindMaps = new Map()
const chatMessages = new Map()

// API Routes
app.get('/api/mindmaps/:id', (req, res) => {
  const { id } = req.params
  const mindMap = mindMaps.get(id)
  
  if (!mindMap) {
    return res.status(404).json({ error: 'Mind map not found' })
  }
  
  res.json(mindMap)
})

app.post('/api/mindmaps', (req, res) => {
  const { title, nodes, connections } = req.body
  const id = uuidv4()
  
  const mindMap = {
    id,
    title: title || 'Untitled Mind Map',
    nodes: nodes || [],
    connections: connections || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  mindMaps.set(id, mindMap)
  res.json(mindMap)
})

app.put('/api/mindmaps/:id', (req, res) => {
  const { id } = req.params
  const { title, nodes, connections } = req.body
  
  const mindMap = mindMaps.get(id)
  if (!mindMap) {
    return res.status(404).json({ error: 'Mind map not found' })
  }
  
  mindMap.title = title || mindMap.title
  mindMap.nodes = nodes || mindMap.nodes
  mindMap.connections = connections || mindMap.connections
  mindMap.updatedAt = new Date().toISOString()
  
  mindMaps.set(id, mindMap)
  res.json(mindMap)
})

app.get('/api/mindmaps/:id/chat', (req, res) => {
  const { id } = req.params
  const messages = chatMessages.get(id) || []
  res.json(messages)
})

app.post('/api/mindmaps/:id/chat', (req, res) => {
  const { id } = req.params
  const { user, message } = req.body
  
  if (!user || !message) {
    return res.status(400).json({ error: 'User and message are required' })
  }
  
  const chatMessage = {
    id: uuidv4(),
    user,
    message,
    timestamp: new Date().toISOString()
  }
  
  const messages = chatMessages.get(id) || []
  messages.push(chatMessage)
  chatMessages.set(id, messages)
  
  // Emit to all connected clients
  io.to(id).emit('newMessage', chatMessage)
  
  res.json(chatMessage)
})

// Socket.io for real-time collaboration
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)
  
  // Join a mind map room
  socket.on('joinMindMap', (mindMapId) => {
    socket.join(mindMapId)
    console.log(`User ${socket.id} joined mind map ${mindMapId}`)
  })
  
  // Leave a mind map room
  socket.on('leaveMindMap', (mindMapId) => {
    socket.leave(mindMapId)
    console.log(`User ${socket.id} left mind map ${mindMapId}`)
  })
  
  // Handle mind map updates
  socket.on('updateMindMap', (data) => {
    const { mindMapId, nodes, connections } = data
    const mindMap = mindMaps.get(mindMapId)
    
    if (mindMap) {
      mindMap.nodes = nodes
      mindMap.connections = connections
      mindMap.updatedAt = new Date().toISOString()
      mindMaps.set(mindMapId, mindMap)
      
      // Broadcast to all clients in the room except sender
      socket.to(mindMapId).emit('mindMapUpdated', { nodes, connections })
    }
  })
  
  // Handle node selection
  socket.on('selectNode', (data) => {
    const { mindMapId, nodeId } = data
    socket.to(mindMapId).emit('nodeSelected', { nodeId, userId: socket.id })
  })
  
  // Handle cursor position
  socket.on('cursorMove', (data) => {
    const { mindMapId, x, y } = data
    socket.to(mindMapId).emit('cursorMoved', { x, y, userId: socket.id })
  })
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
