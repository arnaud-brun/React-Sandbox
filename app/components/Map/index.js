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
import { MAPBOX_TOKEN_URL } from './constants.js';

import Pin from './pin';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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
    fetch(MAPBOX_TOKEN_URL)
    .then(response => response.json())
    .then(data => this.setState({ mapBoxToken: data.token, isLoading: false }));
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

  handleClick(event) {
    console.log(event);
    const lng = event.lngLat[0];
    const lat = event.lngLat[1];
    // const viewport = Object.assign({}, this.state.viewport, {
    //   longitude: lng,
    //   latitude: lat,
    //   zoom: 11,
    //   transitionInterpolator: new FlyToInterpolator(),
    //   transitionDuration: 250,
    // })
    const marker = Object.assign({}, this.state.marker, {
      longitude: lng,
      latitude: lat,
    });
    this.setState({
      marker,
      // viewport,
    });
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
        onClick={(event) => this.handleClick(event)}
        mapboxApiAccessToken={this.state.mapBoxToken}
        onViewportChange={(viewport) => this._onViewportChange(viewport)}
      >
        <Marker
          latitude={this.state.marker.latitude}
          longitude={this.state.marker.longitude}
          >
          <Pin size={20} />
        </Marker>
      </ReactMapGL>
    );
  }
}

export default Map;
