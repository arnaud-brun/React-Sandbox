/**
*
* GoogleMap
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Map from './map';

import {
  GOOGLE_MAPS_KEY_URL,
  ACCESS_GOOGLE_PLACES
} from './constants.js';

class MyGoogleMap extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      apiUrl: this.setUrls(this.props.route),
      map: {
        apiKey: null,
        googleMapURL: null,
        defaultZoom:15,
        center: { lat: 49.1146043873578, lng: 6.176324177575793 },
      },
      mapComponent: {
        loadingElement: (<div style={{ height: `100%` }} />),
        containerElement: (<div style={{ height: `400px` }} />),
        mapElement: (<div style={{ height: `100%` }} />),
      },
      marker: {
        position: { lat: 49.1146043873578, lng: 6.176324177575793 },
      },
      places: [],
    }
  }

  componentWillMount() {
    fetch(this.state.apiUrl.maps)
    .then(response => response.json())
    .then(data => {
      const apiKey = data.key;
      const googleMapURL = this.getGmapUrl(apiKey);
      const map = Object.assign({}, this.state.map, {
        apiKey,
        googleMapURL,
      });
      this.setState({ map });
    });
  }

  setUrls(route) {
    let mapsUrl = GOOGLE_MAPS_KEY_URL;
    let placesUrl = ACCESS_GOOGLE_PLACES;
    if (route) {
        mapsUrl = this.props.route + GOOGLE_MAPS_KEY_URL;
        placesUrl = this.props.route + ACCESS_GOOGLE_PLACES;
    }
    return {
      maps: mapsUrl,
      places: placesUrl,
    };
  }

  getGmapUrl(apiKey) {
    let gmapUrl = 'https://maps.googleapis.com/maps/api/js?key=';
    gmapUrl += apiKey;
    gmapUrl += '&v=3.exp';
    gmapUrl += '&libraries=geometry,drawing,places';
    return gmapUrl;
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

  updateMapAndMarker(latLng) {
    const mapComponent = Object.assign({}, this.state.mapComponent, {
      center: latLng,
    });
    const marker = Object.assign({}, this.state.marker, {
      position: latLng,
    });
    this.setState({
      mapComponent,
      marker,
    });
  }

  handleClick(event) {
    const latLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    this.getPlaces(latLng);
    this.updateMapAndMarker(latLng);
  }

  renderLoading() {
    return(<div>Loading</div>);
  }

  render() {
    if (this.state.map.apiKey == null || !this.state.map.googleMapURL == null) {
      return this.renderLoading();
    }

    return (
      <Map
        {...this.state.mapComponent}
        {...this.state.map}
        marker={this.state.marker}
        places={this.state.places}
        onClick={(event) => this.handleClick(event)}
        />
    );
  }
}

MyGoogleMap.propTypes = {

};

export default MyGoogleMap;
