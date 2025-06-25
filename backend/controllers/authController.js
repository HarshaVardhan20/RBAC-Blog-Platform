const express = require('express');

const router = express.Router();
const {z}  = require('zod');
const pool = require('../db/db');
const transporter = require('../utils/mailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');
const hashPassword = require('../utils/hashPassword');
require('dotenv').config();

const JWT_SECRET  = process.env.JWT_SECRET;
const signupSchema = z.object({
    name: z.string().min(1,'Name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string()
    .min(8,'Password must be at least 8 characters')
})

const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string()
})



const signupUser = async (req, res) => {
  const validateData = signupSchema.safeParse(req.body);
  console.log(req.body);
  if (!validateData.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: validateData.error.errors.map(err => ({
        field: err.path[0],
        message: err.message
      }))
    });
  }

  const { email, password, name } = req.body;
  const hashed_password = await hashPassword(password);

  try {
    const userExists = await pool.query('SELECT * FROM users WHERE email=$1',[email]);
    if(userExists.rows.length>0){
      return res.status(401).json({
        message: 'Email already exists'
      })
    }
    await pool.query(
      'INSERT INTO users (name, email, hashed_password) VALUES ($1, $2, $3)',
      [name, email, hashed_password]
    );

    const userFound = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userFound.rows[0];
    const userId = user.id;

    const emailToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const verificationLink = `${process.env.BASE_URL}/verify-email?token=${emailToken}`;

    await transporter.sendMail({
      to: user.email,
      subject: 'Verify your Email',
      html: `<p>Click the link to verify your account:</p>
             <a href="${verificationLink}">Verify Email</a>`,
    });

    return res.status(201).json({
      message: 'User registered successfully. Please check your email to verify your account.'
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    console.log('hlo');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await pool.query('UPDATE users SET is_verified = TRUE WHERE id = $1', [userId]);
    
    res.status(200).json({
      message: 'Email verified successfully. You can now log in.',
      user: user
    });

  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: 'Invalid or expired verification token'
    });
  }
};


const loginUser = async (req, res) => {
  console.log('hlo');
  const validateData = loginSchema.safeParse(req.body);
  if (!validateData.success) {
    return res.status(401).json({
      message: 'Invalid credentials'
    });
  }

  const { email, password } = req.body;

  try {
    const userFound = await pool.query(
      'SELECT * FROM users WHERE email = $1', [email]
    );

    if (userFound.rows.length === 0) {
      return res.status(401).json({
        message: "Incorrect email or password"
      });
    }

    const user = userFound.rows[0];

    const passwordCheck = await bcrypt.compare(password, user.hashed_password);
    if (!passwordCheck) {
      return res.status(401).json({
        message: 'Incorrect email or password'
      });
    }

    const token =await generateToken(user.id, res); 

    return res.status(200).json({
      message: 'Login successful',
      token,
      user
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error while logging in user'
    });
  }
};



module.exports = {signupUser,loginUser,verifyEmail}