const db = require('../../db');

const getUsersLikes = async (id='') => {
  if (!id) return { error: 'Need user\'s id'};

  const likes = await db.query(`
    SELECT COUNT(*) FROM likes
    INNER JOIN users ON users.id = likes.user_id
    WHERE likes.user_id = $1;
  `, [id]);

  const filmsLiked = await db.query(`
    SELECT title, url, overview, release_date, vote_average, vote_count
    FROM films 
    INNER JOIN likes ON likes.film_id = films.id
    WHERE likes.user_id = $1
  `, [id]);

  return { filmsLiked: likes.rows[0], films: filmsLiked.rows }
}

module.exports = getUsersLikes;