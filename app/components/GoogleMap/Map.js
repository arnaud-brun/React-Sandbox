import React from 'react';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const Map = withScriptjs(withGoogleMap(props => {
  console.log('props', props)
  const map = props.map
  const marker = props.marker;
  const places = props.places.map((place, index) => {
    const key = 'place-marker-' + index;
    const position = {...place.geometry.location};
    // const icon = {
    //   url: 'components/GoogleMap/assets/restaurant.png',
    // }
    // console.log('icon', icon)
    //
    // const style = {
    //   width: '100px',
    //   height: '100px',
    //   color: 'black',
    // }
    // Put icon or label to distinguish them
    return (
      <Marker
        key={key}
        defaultPosition={position}
      />
    )
  });
  return (
    <GoogleMap {...props}>
      <Marker position={marker.position}/>
      {places}
    </GoogleMap>
  );
}));

export default Map;
