/**
*
* Map
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import ReactMapGL, {Marker, FlyToInterpolator} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_KEY_URL } from './constants.js';

import Pin from './pin';

class MapBox extends React.Component {
  constructor(props) {
    super(props);
    let mapBoxUrl = MAPBOX_KEY_URL;
    if (this.props.route) {
      mapBoxUrl = this.props.route + MAPBOX_KEY_URL;
    }

    this.state = {
      isLoading: true,
      mapBoxUrl,
      mapBoxToken: null,
      viewport: {
        latitude: 37.7751,
        longitude: -122.4193,
        zoom: 11,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500
      },
      marker: {
        latitude: 37.7751,
        longitude: -122.4193,
      }
    };
  }

  componentDidMount() {
    fetch(this.state.mapBoxUrl)
    .then(response => response.json())
    .then(data => this.setState({ mapBoxToken: data.key, isLoading: false }));
  }

  _onViewportChange = viewport => this.setState({
    viewport: {...this.state.viewport, ...viewport}
  });

  _goToViewport = ({longitude, latitude}) => {
   this._onViewportChange({
     longitude,
     latitude,
     zoom: 11,
     transitionInterpolator: new FlyToInterpolator(),
     transitionDuration: 3000
   });
 };

 _putMarker(lng, lat) {
   const marker = Object.assign({}, this.state.marker, {
     longitude: lng,
     latitude: lat,
   });
   this.setState({
     marker,
   });
 }

  handleMapClick(event) {
    const lng = event.lngLat[0];
    const lat = event.lngLat[1];
    this._putMarker(lng, lat);
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
        mapStyle="mapbox://styles/mapbox/dark-v9"
        dragToRotate={false}
        onClick={(event) => this.handleMapClick(event)}
        mapboxApiAccessToken={this.state.mapBoxToken}
        onViewportChange={(viewport) => this._onViewportChange(viewport)}
      >
        <Marker {...this.state.marker} >
          <Pin size={20} />
        </Marker>
      </ReactMapGL>
    );
  }
}

export default MapBox;
