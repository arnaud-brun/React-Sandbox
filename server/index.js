/* eslint consistent-return:0 */

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();

// Set up body-parser
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// Create socket channel
require('./middlewares/socketMiddleware')(app, 80, logger);

// Use fake booking data
const dataMiddleware = require('./middlewares/fakeBookingMiddleware');
app.use('/getBookingData', dataMiddleware);

// Enable maps components
const mapMiddleware = require('./middlewares/mapMiddleware');
app.use('/map', mapMiddleware);

// Enable authentication
const authMiddleware = require('./middlewares/authMiddleware');
app.use('/auth', authMiddleware);


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
