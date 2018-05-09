/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);
require('./middlewares/socketMiddleware')(app, 80, logger);

const appartments = require('./middlewares/fakerMiddleware')();

app.get('/getBookingData', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({bookingData: appartments}));
});



// If the api_keys.env file doesn't exist in the root top level, create it
// it contains the following fields
//    MAPBOX_TOKEN
const dotenv = require('dotenv').config({path: 'api_keys.env'});
app.get('/getMapBoxToken', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({token: process.env.MAPBOX_TOKEN}));
});
// app.get('/getBookingData/image/:url', (req, res, next) => {
//   logger.log('sending back file')
//   const options = {
//     root: __dirname + '/data/',
//     dotfiles: 'deny',
//     headers: {
//         'x-timestamp': Date.now(),
//         'x-sent': true
//     }
//   };
//
//   const fileName = req.params.url;
//
//   res.sendFile('image.jpg', options, (err) => {
//     if (err) {
//       logger.error('Error in file transfert');
//     } else {
//       logger.log('file sent');
//     }
//   });
// });

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, prettyHost, url);
    });
  } else {
    logger.appStarted(port, prettyHost);
  }
});
