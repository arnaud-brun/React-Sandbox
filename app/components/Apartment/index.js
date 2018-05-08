/**
*
* Apartment
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/lib/Carousel';
import { FormattedMessage } from 'react-intl';


import messages from './messages';
import './apartment.scss';



class Apartment extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isHover: false,
    }
  }

  setGridHover(isHover) {
    this.setState({ isHover });
  }

  renderGrid() {
    const apt = this.props.apartment;
    const aptPath = '/booking/apartment/' + apt.id;
    const imageSrc = apt.pictures[0];
    const active = this.state.isHover ? 'active' : '';

    return (
      <div className={'preview ' + active}
        onClick={() => this.props.handleGridClick(aptPath)}
        onMouseEnter={() => this.setGridHover(true)}
        onMouseLeave={() => this.setGridHover(false)}>
        <img src={imageSrc}></img>
        <div className='meta'>
          <div className='title'>
            {apt.title}
          </div>
          <div className='people'>
            <span className="glyphicon">&#xe008; {apt.nbPeople}</span>
          </div>
        </div>
      </div>
    )
  }

  renderAptData(aptData) {
    const data = Object.keys(aptData).map( (key, index) => {
      const field = key;
      const value = aptData[key];
      if (field === 'id') {
        return;
      }

      if (field === 'pictures') {
        return (
          <div key={index}>
            <h2>{field}</h2>
            {this.renderPictures(value)}
          </div>
        )
      }
      return (
        <div key={index}>
          <h2>{field}</h2>
          <p>{value}</p>
        </div>
      );
    });
    return data;
  }

  renderPictures(picturesUrl) {
    return (
      <div className={'apt-pictures'}>
        {picturesUrl.map( url => <img src={url}></img> )}
      </div>
    )
  }

  render() {
    if (this.props.grid) {
      return this.renderGrid();
    }

    if (this.props.location.state.apartmentData) {
      let apt = this.props.location.state.apartmentData;
      return (
        <div>
          <FormattedMessage {...messages.header} />
          {this.renderAptData(apt)}
        </div>
      );
    }

    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );

    // Relative descriptions

    // Map
  }
}

Apartment.propTypes = {
  handleGridClick: PropTypes.func,
};

export default Apartment;
