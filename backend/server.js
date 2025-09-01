import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { readFileSync } from 'fs';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});

const PORT = 4000;

app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true
}));
app.use(express.json());

// Serve patient data
app.get('/patients', (req, res) => {
  try {
    const data = readFileSync('./db.json', 'utf8');
    const patients = JSON.parse(data).patients;
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load patients' });
  }
});

// WebSocket connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Send initial data
  try {
    const data = readFileSync('./db.json', 'utf8');
    const patients = JSON.parse(data).patients;
    socket.emit('patients:update', patients);
  } catch (error) {
    console.error('Error reading db.json:', error);
  }

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Simulate patient updates every 3 seconds
setInterval(() => {
  try {
    const data = readFileSync('./db.json', 'utf8');
    const db = JSON.parse(data);
    
    // Update a random patient's heart rate
    if (db.patients.length > 0) {
      const randomIndex = Math.floor(Math.random() * db.patients.length);
      db.patients[randomIndex].heartRate = Math.floor(Math.random() * 40) + 60; // 60-100
      db.patients[randomIndex].lastUpdated = new Date().toISOString();
      
      // Emit update to all clients
      io.emit('patients:update', db.patients);
    }
  } catch (error) {
    console.error('Error updating patients:', error);
  }
}, 1000);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('WebSocket server ready');
});
