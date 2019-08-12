const { Pool } = require('pg');
const validator = require('validator');

// For heroku
let pool
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  })
} else {
  // When in development
  pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DB,
    password: process.env.DBPW,
    port: process.env.DBPORT,
  })
}


const dropTables = async () => {
  try {
    const res = await pool.query(`
      CREATE EXTENSION IF NOT EXISTS "pgcrypto";
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS likes CASCADE;
      DROP TABLE IF EXISTS dislikes CASCADE;
      DROP TABLE IF EXISTS films CASCADE;
      DROP TABLE IF EXISTS favorites CASCADE;
    `)
  } catch(e) {
    console.log(e);
  }
}

const createTables = async () => {
  try {
    const res1 = await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        first_name VARCHAR(355),
        last_name VARCHAR(355), 
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL CHECK (length(password) > 7),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log(res1);

    const res2 = await pool.query(`
      CREATE TABLE IF NOT EXISTS films (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT UNIQUE NOT NULL,
        url TEXT UNIQUE NOT NULL,
        overview TEXT,
        release_date DATE,
        vote_average REAL,
        vote_count INT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      ); 
    `)
    console.log(res2);

    // likes have info of user and film
    const res3 = await pool.query(`
      CREATE TABLE IF NOT EXISTS likes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        film_id UUID REFERENCES films(id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `)
    console.log(res3);

    const res4 = await pool.query(`
      CREATE TABLE IF NOT EXISTS dislikes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        film_id UUID REFERENCES films(id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `)
    console.log(res4);

    const res5 = await pool.query(`
      CREATE TABLE IF NOT EXISTS favorites (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        film_id UUID REFERENCES films(id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `)
    console.log(res5);
    
  } catch (e) {
    console.log(e);
  }
}

const alterTable1 = async () => {
  try {
    const res = await pool.query(`
      ALTER TABLE likes
        ADD CONSTRAINT unique_user_film_likes UNIQUE(user_id, film_id);

      ALTER TABLE dislikes
        ADD CONSTRAINT unique_user_film_dislikes UNIQUE(user_id, film_id);

        ALTER TABLE favorites
        ADD CONSTRAINT unique_user_film_favs UNIQUE(user_id, film_id);
    `)
    console.log(res)
  } catch (e) {
    console.log(e);
  }
}

const alterTable2 = async () => {
  try {
    const res = await pool.query(`
      ALTER TABLE films
        DROP CONSTRAINT IF EXISTS films_url_key;
    `)
    console.log(res)
  } catch (e) {
    console.log(e);
  }
  
}

// createTables();
// dropTables();
// alterTable1();
// alterTable2();

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}