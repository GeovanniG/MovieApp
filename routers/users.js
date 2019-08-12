const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');
const postUser = require('../db/user/postUser');
const getUserAuth = require('../db/user/getUserAuth');
const deleteUser = require('../db/user/deleteUser');
const updateUser = require('../db/user/updateUser');


// Helper method, used when user logs in or registers
const createToken = async (res, id) => {
  // Try to create token
  let token;
  try {
    token = await jwt.sign({ id }, process.env.JWTSECRET, { expiresIn: '1h' });
  } catch (e) {
    return res.status(400).json({ error: 'Token creation error' })
  }
  
  res.status(201).json({ token, id });
}


// Create user
router.post('/user/register', async (req, res) => {
  // Try to create user
  let id;
  try {
    const response = await postUser(req.body);
    id = response.id;
  } catch (e) {
    if (e.error === 'PasswordLengthError') return res.status(400).json({ error: 'Please provide a password with at least 8 characters'});
    else if (e.error === 'InvalidEmailError') return res.status(400).json({ error: 'Please provide a valid email' });
    else if (e.constraint === 'users_email_key') return res.status(400).json({ error: 'Email already exists' })
    return res.status(400).json({ error: 'Database error' })
  }

  createToken(res, id);
})

// Retrieve user
router.post('/user/login', async (req, res) => {
  // Verify user
  let id;
  try {
    id = await getUserAuth(req.body);
    if (!id) return res.json({ user: 'No such user. Please sign instead' })
  } catch (e) {
    return res.status(400).json({ error: 'Wrong email or password entered' });
  }

  createToken(res, id);
})

// Delete user
router.delete('/user/:id', auth, async (req, res) => {
  const id = req.params.id || req.body.id;

  let user;
  try{
    user = await deleteUser(id);
    if (!user) return res.json({ user: 'No such user' });
  } catch (e) {
    return res.status(400).json({ error: 'Unable to delete user' });
  }

  res.json(user);
})

// Update user
router.patch('/user/:id', auth, async (req, res) => {
  const id = req.params.id || req.body.id;
  const updatedUser = req.body.updatedUser;

  let newUser;
  try {
    newUser = await updateUser(id, updatedUser);
    if (!newUser) return res.json({ user: 'No such user' });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: 'Unable to update user' })
  }
  
  res.json({ newUser })
})


module.exports = router;