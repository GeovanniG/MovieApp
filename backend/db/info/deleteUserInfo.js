const db = require('../db');

const deleteUserInfo = async (info='likes', userId, filmTitle) => {
  if (!userId) throw { error: 'UserIdError' };
  if (!filmTitle) throw { error: 'FilmTitleError' };
  
  // Allow info to only be likes, dislikes, or favorites
  switch (info) {
    case 'likes':
    case 'dislikes':
    case 'favorites':
      break;
    default:
      throw { error: 'InfoError' }
  }

  const deletedInfo = await db.query(`
    DELETE FROM ${info} 
    WHERE user_id = $1 AND film_id = (
      SELECT id FROM films WHERE title = $2
    ) RETURNING id;
  `, [userId, filmTitle]);

  return deletedInfo.rows[0]
}

module.exports = deleteUserInfo;