const db = require('../db');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const insertUser = async ({ firstName='', lastName='', email, password }) => {
    if (!password || password.length < 8) throw {error: 'PasswordLengthError'};
    if (!email || !validator.isEmail(email)) throw {error: 'InvalidEmailError'};

    // Decided to hash here instead of database:
    // https://stackoverflow.com/questions/18707389/hash-passwords-with-bcrypt-in-the-database-or-in-php-code?noredirect=1&lq=1
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALTROUNDS, 10));

    
    const user = await db.query(`
      INSERT INTO users(first_name, last_name, email, password) 
      VALUES($1, $2, $3, $4) RETURNING id;
    `, [firstName, lastName, email, hashedPassword])
    return user.rows[0];
}

module.exports = insertUser;