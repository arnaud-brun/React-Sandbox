/**
 *
 * MapPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMapPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';



import Map from 'components/Map';
import MyGoogleMap from 'components/GoogleMap';


export class MapPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <Map />
        <MyGoogleMap />
      </div>
    );
  }
}

MapPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mappage: makeSelectMapPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'mapPage', reducer });
const withSaga = injectSaga({ key: 'mapPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MapPage);
