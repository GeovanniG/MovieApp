const db = require('../db');

const postUserInfo = async (info='likes', userId, filmId) => {
  if (!userId) throw { error: 'UserIdError' };
  if (!filmId) throw { error: 'FilmMissingError'};

  // Allow info to only be likes, dislikes, or favorites
  switch (info) {
    case 'likes':
    case 'dislikes':
    case 'favorites':
      break;
    default:
      throw { error: 'InfoError' }
  }

  let id;
  id = await db.query(`
    INSERT INTO ${info} (film_id, user_id)
    VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING id;
  `, [filmId, userId]);
  
  // Will be < 1 when like already exists in database
  if (id.rows.length < 1) {
    id = await db.query(`
      SELECT id FROM ${info} WHERE film_id = $1 AND user_id = $2;
    `, [filmId, userId]);
  }

  return id.rows[0];
}

module.exports = postUserInfo;