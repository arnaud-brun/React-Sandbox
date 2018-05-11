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


import {
  GOOGLE_MAPS_KEY_URL,
  ACCESS_GOOGLE_PLACES
} from './constants.js';

const Map = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    {...props}
  >
    {props.renderMarker()}

    {props.renderPlaces()}
  </GoogleMap>
));



class MyGoogleMap extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    let mapsUrl = GOOGLE_MAPS_KEY_URL;
    let placesUrl = ACCESS_GOOGLE_PLACES;
    if (this.props.route) {
        mapsUrl = this.props.route + GOOGLE_MAPS_KEY_URL;
        placesUrl = this.props.route + ACCESS_GOOGLE_PLACES;
    }

    this.state = {
      apiKey: {
        maps: null,
        places: null,
      },
      apiUrl: {
        maps: mapsUrl,
        places: placesUrl,
      },
      mapComponent: {
        defaultZoom:15,
        defaultCenter: { lat: 49.1146043873578, lng: 6.176324177575793 },
      },
      marker: {
        position: { lat: 49.1146043873578, lng: 6.176324177575793 },
      },
      places: [],
    }
  }
  componentWillMount() {
    console.log('this.state.apiUrl.maps', this.state.apiUrl.maps)

    fetch(this.state.apiUrl.maps)
    .then(response => response.json())
    .then(data => {
      const apiKey = Object.assign({}, this.state.apiKey, {
        maps: data.key,
      });
      this.setState({ apiKey });
    });
  }

  getPlaces(latLng) {
    const placesUrl = this.state.apiUrl.places + '/' + latLng.lat + '/' + latLng.lng;
    const fetchOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      }
    };
    fetch(placesUrl, fetchOptions)
    .then(response => response.json())
    .then(data => {
      if(data.error) {
        console.log('error detected');
      } else {
        this.setState({
          places: data.places,
        });
      }
    });
  }

  updateMapCenter(latLng) {
    const mapComponent = Object.assign({}, this.state.mapComponent, {
      defaultCenter: latLng,
    });
    this.setState({
      mapComponent,
    });
  }

  moveMarker(latLng) {
    const marker = Object.assign({}, this.state.marker, {
      position: latLng,
    });
    this.setState({
      marker,
    });
  }

  handleClick(event) {
    const latLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    this.getPlaces(latLng);
    this.updateMapCenter(latLng);
    this.moveMarker(latLng);
  }

  renderMarker() {
    return (
      <Marker defaultPosition={this.state.marker.position}/>
    )
  }
  renderPlaces() {
    if (this.state.places.length == 0) {
      return;
    }

    const places = this.state.places.map((place, index) => {
      console.log(index, place);
      const position = {...place.geometry.location};

      return (
        <Marker defaultPosition={position} />
      )
    });
    return places;
  }

  render() {
    if (!this.state.apiKey.maps) {
      return (
        <div>
          Loading
        </div>
      )
    }

    let gmapUrl = 'https://maps.googleapis.com/maps/api/js?key=';
    gmapUrl += this.state.apiKey.maps;
    gmapUrl += '&v=3.exp&libraries=geometry,drawing,places';
    return (
      <Map
        googleMapURL={gmapUrl}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        onClick={(event) => this.handleClick(event)}
        renderMarker={() => this.renderMarker()}
        renderPlaces={() => this.renderPlaces()}
        {...this.state.mapComponent}
        />
    );
  }
}

MyGoogleMap.propTypes = {

};

export default MyGoogleMap;
