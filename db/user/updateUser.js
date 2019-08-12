const bcrypt = require('bcryptjs');
const db = require('../db');
const getUser = require('./getUser');

const updateUser = async (id, { firstName='', lastName='', email='', password='' }) => {
  // Find user in database
  const user = await getUser(id);
  if (!user) return user;

  const { first_name: oldFirstName, last_name: oldLastName, email: oldEmail, password: oldPassword } = user;

  let hashedPassword = '';
  if (password) hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALTROUNDS, 10));

  // Update only provided values
  const newUser = await db.query(`
    UPDATE users
    SET first_name = $1,
        last_name = $2,
        email = $3,
        password = $4
    WHERE id = $5 RETURNING first_name, last_name, email;
  `, [firstName || oldFirstName, lastName || oldLastName, email || oldEmail, hashedPassword || oldPassword, id]);

  return newUser.rows[0];
}

module.exports = updateUser;