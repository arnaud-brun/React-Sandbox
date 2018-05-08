/**
*
* Apartment
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

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

  renderTitle(title) {
    return (
      <h1>{title}</h1>
    )
  }
  renderPictures(id, picturesUrl) {
    const keyBase = 'apt-'+id+'-';
    return (
      <div className={'apt-pictures'}>
        {picturesUrl.map( (url, index) => <img key={keyBase+index} src={url}></img> )}
      </div>
    );
  }
  renderMainSmallData(nbPeople, nbBeds, area) {
    return (
      <div className={'apt-data'}>
        <div className='apt-data-icon'>
          <i className="fas fa-user"></i>
          <span>{nbPeople}</span>
        </div>
        <div className='apt-data-icon'>
          <i className="fas fa-bed"></i>
          <span>{nbBeds}</span>
        </div>
        <div className='apt-data-icon'>
          <i className="far fa-square"></i>
          <span>{area}</span>
        </div>
      </div>
    );
  }
  renderDescription(description) {
    return (
      <div className='apt-description'>
        <h2>Description</h2>
        <p>{description}</p>
      </div>
    );
  }
  renderSideSmallData(wifi, carParc) {
    return (
      <div className='apt-data'>
        <div className='apt-data-icon'>
          <i className="fas fa-wifi"></i>
          <span>{wifi ? 'oui' : 'non'}</span>
        </div>
        <div className='apt-data-icon'>
          <i className="fas fa-car"></i>
          <span>{carParc ? 'oui' : 'non'}</span>
        </div>
      </div>
    )
  }

  renderAptData(apt) {
    return (
      <div>
        {this.renderPictures(apt.id, apt.pictures)}
        <Grid>
          <Row className="show-grid">
            <Col md={8}>
              <div className="apt">
                {this.renderTitle(apt.title)}
                {this.renderMainSmallData(apt.nbPeople, apt.nbBeds, apt.area)}
                {this.renderDescription(apt.description)}
                {this.renderSideSmallData(apt.wifi, apt.carPark)}
              </div>
            </Col>
            <Col md={4}>
              <div className="order">
                <p>Partie réservée à la réservation</p>
              </div>
            </Col>
          </Row>
        </Grid>
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
          {this.renderAptData(apt)}
        </div>
      );
    }

    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Apartment.propTypes = {
  handleGridClick: PropTypes.func,
};

export default Apartment;
