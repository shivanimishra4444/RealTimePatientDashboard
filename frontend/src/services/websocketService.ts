import { io } from 'socket.io-client';

const socket = io('http://localhost:4000', {
  withCredentials: true,
  transports: ['websocket', 'polling']
});

socket.on('connect', () => {
  console.log('WebSocket connected');
});

socket.on('disconnect', () => {
  console.log('WebSocket disconnected');
});

socket.on('connect_error', (error) => {
  console.error('WebSocket connection error:', error);
});

export default socket;
