const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (userId, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });

  res.cookie("jwt", token, {
    maxAge: 24*60*60*1000, 
    httpOnly: true,
    sameSite: "strict",
  });

  return token; 
};

module.exports = generateToken;
