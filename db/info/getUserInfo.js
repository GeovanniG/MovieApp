const db = require('../db');

const getUserInfo = async (info='likes', userId) => {
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

  const filmCount = await db.query(`
    SELECT COUNT(*) FROM ${info}
    INNER JOIN users ON users.id = ${info}.user_id
    WHERE ${info}.user_id = $1;
  `, [userId]);


  const filmsInfo = await db.query(`
    SELECT title, url AS poster_path, overview, release_date, vote_average, vote_count
    FROM films 
    INNER JOIN ${info} ON ${info}.film_id = films.id
    WHERE ${info}.user_id = $1
  `, [userId]);

  return { filmCount: filmCount.rows[0], filmsInfo: filmsInfo.rows }
}

module.exports = getUserInfo;