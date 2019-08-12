const db = require('../db');

const getUserInfo = async (info='likes', userId, title) => {
  if (!userId) throw { error: 'UserIdError' };
  
  // Allow info to only be likes, dislikes, or favorites
  switch (info) {
    case 'likes':
    case 'dislikes':
    case 'favorites':
      break;
    default:
      throw { error: 'InfoError' }
  }

  const film = await db.query(`
    SELECT title, url, overview, release_date, vote_average, vote_count
    FROM films 
    INNER JOIN ${info} ON ${info}.film_id = films.id
    WHERE ${info}.user_id = $1 and films.title = $2;
  `, [userId, title]);
  
  return film.rows[0] 
}

module.exports = getUserInfo;