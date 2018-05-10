/**
*
* GoogleMap
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";


import { GOOGLE_MAPS_API_URL, GOOGLE_PLACES_API_URL} from './constants.js';

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    <Marker
      position={{ lat: -34.397, lng: 150.644 }}
    />
  </GoogleMap>
));



class MyGoogleMap extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      apiKey: {
        maps: null,
        places: null,
      }
    }
  }

  componentWillMount() {
    fetch(GOOGLE_MAPS_API_URL)
    .then(response => response.json())
    .then(data => {
      const apiKey = Object.assign({}, this.state.apiKey, {
        maps: data.key,
      });
      this.setState({ apiKey });
    });

    fetch(GOOGLE_PLACES_API_URL)
    .then(response => response.json())
    .then(data => {
      const apiKey = Object.assign({}, this.state.apiKey, {
        places: data.key,
      });
      this.setState({ apiKey });
    });
  }

  onClick() {
    // fetch the nearby industries according to the location
    // move the Marker
  }

  render() {

    if (this.state.apiKey.maps) {
      let gmapUrl = 'https://maps.googleapis.com/maps/api/js?key=';
      gmapUrl += this.state.apiKey.maps;
      gmapUrl += '&v=3.exp&libraries=geometry,drawing,places';
      return (
        <MapWithAMarker
          googleMapURL={gmapUrl}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          />
      );
    }

    return (
      <div>
        Loading
      </div>
    )
  }
}

MyGoogleMap.propTypes = {

};

export default MyGoogleMap;
