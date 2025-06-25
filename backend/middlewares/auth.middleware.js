const jwt = require('jsonwebtoken');
const pool = require('../db/db');
require('dotenv').config();


const JWT_SECRET = process.env.JWT_SECRET;
const protectRoute = async (req,res,next)=>{
    try{
        console.log(req.body);
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({
                message: 'User is unauthorized/Token not found'
            })
        }    
        const decoded = jwt.verify(token,JWT_SECRET);
        if(!decoded){
            return res.status(401).json({
                message: 'Incorrect token/User not found'
            })
        }
        const userFound = await pool.query('SELECT id,name,email,role from users where id=$1',[decoded.userId]);
        
        if(userFound.rows.length ===0){
            return res.status(401).json({
                message: 'User not found'
            })
        }
        req.user = userFound.rows[0];
        next();
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Internal server error'
        })
    }

}


module.exports = protectRoute;