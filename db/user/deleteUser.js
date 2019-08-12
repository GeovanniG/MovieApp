const db = require('../db');

const deleteUser = async (id) => {
  const user = await db.query(`
    DELETE FROM users WHERE id = $1 RETURNING *;
  `, [id]);

  return user.rows[0]
}

module.exports = deleteUser;