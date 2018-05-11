/**
 * Map middleware
 */
const map = require('express')();
const fetch = require('node-fetch');
const dotenv = require('dotenv').config({path: 'api_keys.env'});

map.get('/getMapBoxKey', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({key: process.env.MAPBOX_KEY}));
});

map.get('/getGoogleMapsKey', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({key: process.env.GOOGLE_MAPS_KEY}));
});

map.get('/getNearbyPlaces/:lat/:lng', (req, res, next) => {
  let placesUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  placesUrl += '?location='+req.params.lat+','+req.params.lng;
  placesUrl += '&radius=500&type=restaurant&keyword=cruise';
  placesUrl += '&key='+process.env.GOOGLE_PLACES_API;

  const fetchOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    }
  };
  fetch(placesUrl, fetchOptions)
  .then(response => {
    res.setHeader('Content-Type', 'application/json');
    if (response.ok) {
      response.json().then(json => {
        res.send(JSON.stringify({places: json.results}))
      });
    }
    else {
      res.send(JSON.stringify({places: null, error: true}));
    }
  });
});

module.exports = map;
