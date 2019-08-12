const db = require('../../db');

const postUserLike = async (userId, filmId) => {
  if (!userId) throw { error: 'UserMissingError' };
  if (!filmId) throw { error: 'FilmMissingError'};

  let id;
  id = await db.query(`
    INSERT INTO likes (film_id, user_id)
    VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING id;
  `, [filmId, userId]);
  
  // Will be < 1 when like already exists in database
  if (id.rows.length < 1) {
    id = await db.query(`
      SELECT id FROM likes WHERE film_id = $1 AND user_id = $2;
    `, [filmId, userId]);
  }

  return id.rows[0];
}

module.exports = postUserLike;