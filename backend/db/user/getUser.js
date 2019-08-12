const db = require('../db');

const getUser = async (id) => {
  const user = await db.query(`
      SELECT * FROM users WHERE id = $1
    `, [id]);

  return user.rows[0];
}

module.exports = getUser;