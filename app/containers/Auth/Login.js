/**
 *
 * Auth
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
import makeSelectAuth from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import './styles.scss';


class Login extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      success: false,
      errors: {
        username: '',
        password: '',
      },
    };
  }

  handleChange(e, target) {
    if (target=='username') {
      this.setState({ username: e.target.value });
    }
    else if (target=='password') {
      this.setState({ password: e.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;

    fetch('/auth/login', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password}),
    })
    .then(response => {
      const res = response;
      if (!res.ok) {
        res.json().then(data => {
          console.log('error', data);
          this.setState({
            errors: data.errors,
            success: false
          });
        });
      } else {
        console.log('success');
        this.setState({
          success: true,
        });
      }
    });
  }

  renderStatus() {
    if (this.state.success) {
      return;
    }

    const { username, password } = this.state.errors;
    if (username !== '') {
      return (
        <div className="status">
          {username}
        </div>
      );
    }
    if (password !== '') {
      return (
        <div className="status">
          {password}
        </div>
      );
    }

    return;
  }

  render() {
    return (
      <div className='box'>
        <form className='form' onSubmit={(evt) => this.handleSubmit(evt)}>
          <div className="header">
            <div className="title">Authentification</div>
            {this.renderStatus()}
          </div>
          <div className='field'>
            <p>Username</p>
            <input type="text"
              value={this.state.username}
              onChange={(evt) => this.handleChange(evt, 'username')}
              />
          </div>
          <div className='field'>
            <p>Password</p>
            <input type="password"
              value={this.state.password}
              onChange={(evt) => this.handleChange(evt, 'password')}
              />
          </div>
          <div className='submit'>
            <button
              disabled={this.state.username == '' || this.state.password == ''}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
};

export default Login;
