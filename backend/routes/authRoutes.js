const express = require('express');
const {signupUser,loginUser,verifyEmail} = require('../controllers/authController');
const router = express.Router();

router.post('/signup',signupUser);
router.post('/login',loginUser);

router.post('/verify-email',verifyEmail);

module.exports = router;