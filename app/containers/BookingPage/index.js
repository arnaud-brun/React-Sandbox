/**
 *
 * BookingPage
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
import makeSelectBookingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import './booking.scss';
import Apartment from 'components/Apartment';
import { BOOKING_DATA_URL } from './constants';


export class BookingPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      bookingData: null,
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(BOOKING_DATA_URL)
      .then(response => response.json())
      .then(data => this.setState({ bookingData: data.bookingData, isLoading: false }));
  }

  handleGridClick(aptPath, aptData) {
    this.props.history.push(aptPath, {apartmentData: aptData});
  }

  renderBookingData() {
    if (!this.state.bookingData) {
      return (
        <div>No data found</div>
      )
    }


    return this.state.bookingData.map( (data, index) => {
      return (
        <Apartment
          key={index}
          apartment={data}
          handleGridClick={(aptPath) => this.handleGridClick(aptPath, data)}
          grid />
      )
    });
  }

  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <div className='grid'>
          {this.renderBookingData()}
        </div>
      </div>
    );
  }
}

BookingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  bookingpage: makeSelectBookingPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'bookingPage', reducer });
const withSaga = injectSaga({ key: 'bookingPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BookingPage);
