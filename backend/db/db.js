const { Pool } = require('pg');
const path = require('path'); 
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') }); 

console.log('Loaded URI:', process.env.DATABASE_URI);
const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
  ssl: {
    rejectUnauthorized: false
  },
});

module.exports = pool;
