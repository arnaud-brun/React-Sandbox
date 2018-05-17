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

import isEmail from 'validator/lib/isEmail';


class Signup extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      btnDisabled: false,
      email: '',
      username: '',
      password: '',
      passwordCheck: '',
      success: false,
      errors: {
        email: '',
        username: '',
        password: '',
      }
    };
  }

  validateForm() {
    let errors = {
      email: '',
      username: '',
      password: '',
    };
    let isFormValid = true;
    const { email, username, password, passwordCheck } = this.state;

    if (!isEmail(email)) {
      isFormValid = false;
      errors.email = 'Given mail address is not valid';
    }

    if (username == '') {
      isFormValid = false;
      errors.username = 'Username should not be empty';
    }

    if (password != passwordCheck) {
      isFormValid = false;
      errors.password = 'Given passwords do not match';
    } else if(password.length < 8) {
      isFormValid = false;
      errors.password = 'Given passwords are too short';
    }

    if (!isFormValid) {
      this.setState({
        errors,
      });
    }

    return isFormValid;
  }

  handleChange(e, target) {
    if (target=='email') {
      this.setState({ email: e.target.value.trim() });
    }
    else if (target=='username') {
      this.setState({ username: e.target.value.trim() });
    }
    else if (target=='password') {
      this.setState({ password: e.target.value.trim() });
    }
    else if (target=='passwordCheck') {
      this.setState({ passwordCheck: e.target.value.trim() });
    }
  }

  handleSubmit(e) {
    console.log('handling sign up submition');
    e.preventDefault();

    if (!this.validateForm()) {
      this.setState({
        btnDisabled: true,
        success: false,
      });
      return;
    }

    const { email, username, password } = this.state;

    fetch('/auth/signup', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, username, password}),
    })
    .then(response => {
      const res = response;
      if (!res.ok) {
        res.json().then(data => {
          console.log('error', data);
          this.setState({errors: data.errors});
        });
      } else {
        console.log('success');
        this.setState({success: true});
      }
    });
  }

  renderStatus() {
    return (
      <div>Allright</div>
    );
  }

  render() {
    return (
      <div className='box'>
        <form className='form' onSubmit={(evt) => this.handleSubmit(evt)}>
          <p className="title">Sign up</p>
          <div className="status">
            {this.renderStatus}
          </div>
          <div className='field'>
            <p>Email</p>
            <input type="text"
              placeholder="Email"
              autoComplete='email'
              value={this.state.email}
              onChange={(evt) => this.handleChange(evt, 'email')}
              />
            <p className="error">{this.state.errors.email}</p>
          </div>
          <div className='field'>
            <p>Username</p>
            <input type="text"
              placeholder="Username"
              autoComplete="username"
              value={this.state.username}
              onChange={(evt) => this.handleChange(evt, 'username')}
              />
            <p className="error">{this.state.errors.username}</p>
          </div>
          <div className='field'>
            <p>Password</p>
            <input type="password"
              placeholder="Password"
              autoComplete="new-password"
              value={this.state.password}
              onChange={(evt) => this.handleChange(evt, 'password')}
              />
          </div>
          <div className='field'>
            <p>Confirm password</p>
            <input type="password"
              placeholder="Confirm password"
              value={this.state.passwordCheck}
              onChange={(evt) => this.handleChange(evt, 'passwordCheck')}
              />
            <p className="error">{this.state.errors.password}</p>
          </div>

          <div className="field clause">
            <p>
              Some text you want to add to prevent user that he has to know the privacy policy etc...
            </p>
          </div>

          <div className='field submit'>
            <button
              disabled={this.state.btnDisabled}>
              Submit
            </button>
          </div>
        </form>

        <div className="status">
          {this.state.success && (<p>Sign up successful</p>)}
        </div>

      </div>
    );
  }
}

Signup.propTypes = {
};

export default Signup;
