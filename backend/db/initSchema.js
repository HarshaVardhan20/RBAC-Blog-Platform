const fs = require('fs');
const path = require('path');
const pool = require('./db');

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');

pool.query(schema)
  .then(() => {
    console.log('Schema created successfully');
    pool.end(); 
  })
  .catch((err) => {
    console.error('Unable to create schema.', err.message);
    pool.end(); 
  });
