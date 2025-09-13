# MindMap Builder

A simple mind map builder application built with React, shadcn/ui, and Node.js. Create, share, and collaborate on mind maps in real-time.

## Features

- 🎨 **Interactive Mind Map Creation**: Add nodes, connections, and customize colors
- 👥 **Real-time Collaboration**: Share mind maps and collaborate with others
- 💬 **Live Chat**: Communicate with collaborators in real-time
- 🎯 **Permission Control**: Set view-only or edit permissions
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🌙 **Dark Theme**: Modern dark theme interface

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- shadcn/ui for UI components
- Tailwind CSS for styling
- React Router for navigation
- Socket.io client for real-time features

### Backend
- Node.js with Express
- Socket.io for real-time communication
- CORS enabled for cross-origin requests
- In-memory storage (can be replaced with database)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mindmap-builder
```

2. Install all dependencies:
```bash
npm run install-all
```

3. Start the development servers:
```bash
npm run dev
```

This will start both the frontend (http://localhost:3000) and backend (http://localhost:5000) servers.

### Manual Setup

If you prefer to set up each part separately:

#### Backend Setup
```bash
cd server
npm install
npm run dev
```

#### Frontend Setup
```bash
cd client
npm install
npm run dev
```

## Usage

1. **Home Page**: View the landing page with features and statistics
2. **Create Mind Map**: Click "Start now" to create a new mind map
3. **Add Nodes**: Use the "Add Node" button to create new nodes
4. **Connect Nodes**: Use "Add Line" to connect nodes together
5. **Customize**: Change node colors and text using the properties panel
6. **Share**: Generate shareable links and set permissions
7. **Collaborate**: Use the chat feature to communicate with collaborators

## API Endpoints

### Mind Maps
- `GET /api/mindmaps/:id` - Get a specific mind map
- `POST /api/mindmaps` - Create a new mind map
- `PUT /api/mindmaps/:id` - Update a mind map

### Chat
- `GET /api/mindmaps/:id/chat` - Get chat messages for a mind map
- `POST /api/mindmaps/:id/chat` - Send a new chat message

## Real-time Features

The application uses Socket.io for real-time collaboration:
- Live mind map updates
- Node selection synchronization
- Cursor position sharing
- Real-time chat messages

## Project Structure

```
mindmap-builder/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utility functions
│   │   └── ...
│   ├── package.json
│   └── ...
├── server/                # Node.js backend
│   ├── index.js          # Main server file
│   └── package.json
├── package.json          # Root package.json
└── README.md
```

## Development

### Adding New Features
1. Create components in `client/src/components/`
2. Add new pages in `client/src/pages/`
3. Extend API endpoints in `server/index.js`
4. Update Socket.io events for real-time features

### Styling
- Uses Tailwind CSS with custom dark theme
- shadcn/ui components for consistent design
- Responsive design with mobile-first approach

## Production Deployment

For production deployment:

1. Build the frontend:
```bash
cd client
npm run build
```

2. Set environment variables for the backend
3. Use a process manager like PM2
4. Set up a reverse proxy (nginx)
5. Consider using a database instead of in-memory storage

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
