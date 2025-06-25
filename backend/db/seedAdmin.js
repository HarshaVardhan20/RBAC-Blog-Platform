const bcrypt = require('bcrypt');
const pool = require('./db');

seedAdmin = async()=>{
    const password = 'harsha123';
    const hashedPassword = await bcrypt.hash(password,10);

    await pool.query(
        `INSERT INTO users (name,email,hashed_password,role) VALUES ($1,$2,$3,$4)`,
        ['HarshaAdmin','gunishettiharshavardhan@gmail.com',hashedPassword,'admin']
    );
    console.log('Admin user created successfully')
    pool.end();
}

seedAdmin();