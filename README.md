# Patient Dashboard

Real-time patient monitoring dashboard with WebSocket integration.

## Features

- Real-time patient vital signs updates
- Search and sort functionality
- WebSocket + React Query integration
- TypeScript + Tailwind CSS

## Setup

### Backend
```bash
cd backend
npm install
npm start
```
Runs on `http://localhost:4000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:3000`

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Express.js, Socket.IO
- **State**: React Query
- **Data**: JSON file storage

## Project Structure

```
├── backend/
│   ├── db.json          # Patient data
│   ├── server.js        # WebSocket + REST server
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/  # React components
    │   ├── hooks/       # Custom hooks
    │   └── services/    # API and WebSocket
    └── package.json
```