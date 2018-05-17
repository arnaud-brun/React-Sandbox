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



// import FormGroup from 'react-bootstrap/lib/FormGroup';
// import ControlLabel from 'react-bootstrap/lib/ControlLabel';
// import FormControl from 'react-bootstrap/lib/FormControl';
// import HelpBlock from 'react-bootstrap/lib/HelpBlock';


export class Auth extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {
        username: '',
        password: '',
      }
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

    console.log('handling submit')
    //
    // const username = encodeURIComponent(this.state.username);
    // const password = encodeURIComponent(this.state.password);
    // const formData = `username=${username}&password=${password}`;

    // console.log('sending ', formData)

    const { username, password } = this.state;

    fetch('/auth/login', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username, password: password}),
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
      }
    });
  }

  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />

        <div className='box'>
          <form className='auth' onSubmit={(evt) => this.handleSubmit(evt)}>
            <p>Authentification</p>
            <div className='input'>
              <span>Username</span>
              <input type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={(evt) => this.handleChange(evt, 'username')}
                />
              <p className="error">{this.state.errors.username}</p>
            </div>
            <div className='input'>
              <span>Password</span>
              <input type="text"
                placeholder="Password"
                value={this.state.password}
                onChange={(evt) => this.handleChange(evt, 'password')}
                />
              <p className="error">{this.state.errors.password}</p>
            </div>
            <div className='submit'>
              <button
                disabled={this.state.username == '' || this.state.password == ''}>
                Submit
              </button>
            </div>
          </form>
        </div>

      </div>
    );
  }
}

Auth.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'auth', reducer });
const withSaga = injectSaga({ key: 'auth', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Auth);
