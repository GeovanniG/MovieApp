const db = require('../db');
const bcrypt = require('bcryptjs');

const getUser = async ({ email, password }) => {
  const { rows } = await db.query(`
      SELECT password, id FROM users WHERE email = $1
    `, [email]);

  if(!rows[0]) return;
  const { password: dbPassword, id } = rows[0];
  const compare = await bcrypt.compare(password, dbPassword);

  if (!compare) throw { error: 'AuthenticationError' };

  return id;
}

module.exports = getUser;