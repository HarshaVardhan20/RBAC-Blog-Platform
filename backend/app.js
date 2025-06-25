const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true              
}));


app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);


module.exports  = app;