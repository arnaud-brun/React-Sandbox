/**
*
* Map
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import ReactMapGL from 'react-map-gl';
import { MAPBOX_TOKEN_URL } from './constants.js';

// const MAPBOX_TOKEN = 'pk.eyJ1IjoiYXJuYWF1ZC1icnVuIiwiYSI6ImNqZ3lyd29rMzA1NGYycW13bmsyODd4NWcifQ.Fc0VykkzmQiAqwTbkkxLsQ'; // Set your mapbox token here
const MAPBOX_TOKEN = '';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      mapBoxToken: null,
      viewport: {
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      }
    };
  }

  componentDidMount() {
    fetch(MAPBOX_TOKEN_URL)
    .then(response => response.json())
    .then(data => this.setState({ mapBoxToken: data.token, isLoading: false }));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          Chargement de la carte
        </div>
      );
    }

    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        preventStyleDiffing={false}
        mapboxApiAccessToken={this.state.mapBoxToken}
      />
    );
  }
}

export default Map;
