/**
*
* RangeDatePicker
*
*/

import React from 'react';
// import styled from 'styled-components';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';

import 'react-dates/lib/css/_datepicker.css';


class RangeDatePicker extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
    }
  }

  render() {
    return (
      <div>
        <DateRangePicker
          startDate={this.state.startDate}
          startDateId="your_unique_start_date_id"
          endDate={this.state.endDate}
          endDateId="your_unique_end_date_id"
          onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
        />
      </div>
    );
  }
}

RangeDatePicker.propTypes = {

};

export default RangeDatePicker;
