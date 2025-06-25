// backend/server.js
const http = require('http');
const dotenv = require('dotenv');
const app = require('./app');
const pool = require('./db/db');
const { setupSocket } = require('./io');

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

setupSocket(server);

server.listen(PORT, async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error('DB connection failed:', err);
  }
});
