const db = require('../db');
const types = require('pg').types;

const postFilm = async ({ title, url, overview, releaseDate, voteAverage, voteCount } = {}) => {
  if (!title) throw { error: 'TitleMissingError' }; 
  if (!voteAverage) voteAverage = 0;
  if (!voteCount) voteCount = 0;
  if (!releaseDate) releaseDate='1970-01-01';
  
  if (isNaN(parseFloat(voteAverage))) throw { error: 'VoteAverageNotNumberError' };
  if (isNaN(parseInt(voteCount, 10))) throw { error: 'VoteCountNotNumberError'};
  
  let id;
  id = await db.query(`
    INSERT INTO films (title, url, overview, release_date, vote_average, vote_count)
    VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING RETURNING id;
  `, [title, url, overview, releaseDate, parseFloat(voteAverage), parseInt(voteCount, 10)]);
  
  // Will be < 1 when film already exists in database, 
  // i.e., film with title already exists which gives an error
  if (id.rows.length < 1) {
    id = await db.query(`
      SELECT id FROM films WHERE title = $1;
    `, [title]);
  }

  return id.rows[0];
}

module.exports = postFilm;