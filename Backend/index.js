const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db.js')
const newsRoutes = require('./routes/newsRoutes.js')
const socketHandler = require('./socket/index.js')

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());
app.use((req, res, next) => { // To attach io to requests
  req.io = io;
  next();
});

// Routes
app.use('/api/news', newsRoutes);

// Socket
socketHandler(io);

// Connect DB and start server
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
