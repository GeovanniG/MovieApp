require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const compression = require('compression');

const app = express();
const buildDirectoryPath = path.join(__dirname, 'client/build');
const staticDirectoryPath = path.join(__dirname, 'client/build', 'static');
const indexDirectoryPath = path.join(__dirname, 'client/build', 'index.html');
const port = process.env.PORT || '3001';

const userRouter = require('./routers/users');
const userInfoRouter = require('./routers/userInfo');

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', userRouter);
app.use('/', userInfoRouter);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(buildDirectoryPath, {
    setHeaders: (res, path) => {
        if (path.includes(indexDirectoryPath)) {
            res.setHeader('Cache-Control', 'no-cache');
        } else if (path.includes(staticDirectoryPath)) {
            res.setHeader('Cache-control', 'max-age=31536000');
        }
    }
  }));
    
  // Handle React routing, return all requests to React app
  app.get('/*', (req, res) => {
    res.sendFile(path.join(indexDirectoryPath));
  });
} else {
  const logger = require('morgan');

  app.use(logger('dev'));
  app.use(express.static(buildDirectoryPath));
}

app.listen(port, () => console.log(`Listening on ${port}`));

module.exports = app;