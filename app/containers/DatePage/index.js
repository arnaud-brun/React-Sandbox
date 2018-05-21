/**
 *
 * DatePage
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
import makeSelectDatePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import RangeDatePicker from 'components/RangeDatePicker';
import SingleDatePicker from 'components/SingleDatePicker';

import './styles.scss';


export class DatePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <div className="grid">
          <div className="elt"><RangeDatePicker /></div>
          <div className="elt"><SingleDatePicker /></div>
        </div>
      </div>
    );
  }
}

DatePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  datepage: makeSelectDatePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'datePage', reducer });
const withSaga = injectSaga({ key: 'datePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DatePage);
