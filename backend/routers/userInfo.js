const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const postFilm = require('../db/film/postFilm');
const getUserInfo = require('../db/info/getUserInfo');
const getUserInfoByTitle = require('../db/info/getUserInfoByTitle');
const postUserInfo = require('../db/info/postUserInfo');
const deleteUserInfo = require('../db/info/deleteUserInfo');

// Store likes/dislikes/favorites in database
router.post('/user/:id/:info', auth, async (req, res) => {
  const userId = req.params.id || req.body.id;
  const info = req.params.info || req.body.info;
  const film = req.body.film;

  try {
    let { id: filmId } = await postFilm(film);
    await postUserInfo(info, userId, filmId);
  } catch (e) {
    if (e.error === 'TitleMissingError' || e.error === 'VoteAverageNotNumberError' || e.error === 'VoteCountNotNumberError') {
      return res.status(400).json({ error: 'Bad film data provided' });
    }
    if (e.error === 'UserIdError' || e.error === 'FilmTitleError') {
      return res.status(400).json({ error: `Bad URL provided`});
    }
    if (e.error === 'InfoError') {
      return res.status(400).json({ error: `${info} must be likes, dislikes, or favorites`});
    }
    return res.status(400).json({ error: 'Database error. User may have already been added.' });
  }

  res.status(201).json({ success: `${info} stored successfully` });
})

// Get likes/dislikes/favorites for user
router.get('/user/:id/:info', auth, async (req, res) => {
  const userId = req.params.id || req.body.id;
  const info = req.params.info || req.body.info;
  
  let result;
  try {
    result = await getUserInfo(info, userId);
  } catch (e) {
    if (e.error === 'UserIdError') {
      return res.status(400).json({ error: `Bad URL provided`});
    }
    if (e.error === 'InfoError') {
      return res.status(400).json({ error: `${info} must be likes, dislikes, or favorites`});
    }
    return res.status(400).json({ error: 'Database error' });
  }

  res.json({ ...result });
})

// Get likes/dislikes/favorites for user based on title
router.get('/user/:id/:info/:title', auth, async (req, res) => {
  const userId = req.params.id || req.body.id;
  const info = req.params.info || req.body.info;
  const filmTitle = req.params.title;
  
  let result;
  try {
    result = await getUserInfoByTitle(info, userId, filmTitle);
    if (!result) return res.json({ info: `No ${info} with title: ${filmTitle}` });
  } catch (e) {
    if (e.error === 'UserIdError') {
      return res.status(400).json({ error: `Bad URL provided`});
    }
    if (e.error === 'InfoError') {
      return res.status(400).json({ error: `${info} must be likes, dislikes, or favorites`});
    }
    return res.status(400).json({ error: 'Database error' });
  }

  res.json({ success: `${filmTitle} retreived successfully` });
})

// Delete likes/dislikes/favorites for user
router.delete('/user/:id/:info', auth, async (req, res) => {
  const userId = req.params.id || req.body.id;
  const info = req.params.info || req.body.info;
  const filmTitle = req.body.film.title;

  try {
    const infoId = await deleteUserInfo(info, userId, filmTitle);
    if (!infoId) return res.json({ info: `No such ${info}` });
  } catch (e) {
    if (e.error === 'UserIdError' || e.error === 'FilmTitleError') {
      return res.status(400).json({ error: `Bad URL provided`});
    }
    if (e.error === 'InfoError') {
      return res.status(400).json({ error: `${info} must be likes, dislikes, or favorites`});
    }
    return res.status(400).json({ error: 'Database error' });
  }

  res.json({ success: `${info} deleted successfully ` });
})

module.exports = router;