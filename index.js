require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const logger = require('morgan');

const app = express();
const port = process.env.PORT || '3001';

const userRouter = require('./routers/users');
const userInfoRouter = require('./routers/userInfo');

app.use(helmet())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', userRouter);
app.use('/', userInfoRouter);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on ${port}`));

module.exports = app;