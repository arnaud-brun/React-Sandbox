/**
 *
 * Chat
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


import { sendMessageAction } from './actions';
import './chat.scss';


export class Chat extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      nickname: null,
      nickInput: '',
      chatInput: '',
    };
  }

  handleChatInput(evt) {
    this.setState({
      chatInput: evt.target.value,
    });
  }

  sendMessage() {
    this.props.sendMessage(this.state.nickname, this.state.chatInput);
    this.setState({ chatInput: '' });
  }

  handleNickInput(evt) {
    this.setState({
      nickInput: evt.target.value,
    });
  }

  acceptNickName() {
    this.setState({
      nickname: this.state.nickInput,
    });
  }

  renderMessagesHistory() {
    let list;
    if (this.props.messages) {
      list = this.props.messages.map((msg, index) => <li key={`msg-${index}`}>{this.renderSingleMessage(msg)}</li>);  // eslint-disable-line
    }
    return (<ul className="history">{list}</ul>);
  }

  renderSingleMessage(msg) {
    if (msg) {
      return (
        <div className="message">
          <span className="sender">{msg.sender} : </span>
          <span className="content">{msg.content}</span>
        </div>
      );
    }
    return (
      <div>Not found</div>
    );
  }

  render() {
    let content;
    if (this.state.nickname) {
      content = (
        <div className="chat">
          {this.renderMessagesHistory()}
          <div className="control">
            <input
              type="text"
              placeholder="Taper votre message"
              value={this.state.chatInput}
              onChange={(evt) => this.handleChatInput(evt)}
            ></input>
            <button onClick={() => this.sendMessage()}>Envoyer</button>
          </div>
        </div>
      );
    } else {
      content = (
        <div className="nickname">
          <p>Choose your nickname</p>
          <input
            type="text"
            placeholder="Bobi"
            value={this.state.nickInput}
            onChange={(evt) => this.handleNickInput(evt)}
          ></input>
          <button onClick={() => this.acceptNickName()}>Go chat !</button>
        </div>
      );
    }

    return (
      <div>
        <Helmet>
          <title>Chat</title>
          <meta name="description" content="Description of Chat" />
        </Helmet>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <div>
          {content}
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  messages: PropTypes.array,
};


const mapStateToProps = (state) => ({
  messages: state.get('chat').messages,
  string: state.get('chat').string,
});

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (sender, content) => dispatch(sendMessageAction(sender, content)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'chat', reducer });
const withSaga = injectSaga({ key: 'chat', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Chat);
