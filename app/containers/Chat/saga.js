import { take, put, call, all } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';

import {
  SOCKET_URL,
  SOCKET_CHAT_EVENT,
  CHAT_SAGA_RCV_MSG_ACTION,
  CHAT_CONT_SEND_MSG_ACTION,
} from './constants';

import {
  sagaReceiveMessage,
  receiveMessageAction,
} from './actions';

function listenSocket(socket) {
  /*
    Note: messages on an eventChannel are not buffered by default.
    You have to provide a buffer to the eventChannel factory in order to specify
    buffering strategy for the channel
    (e.g. eventChannel(subscriber, buffer)).
    See the API docs for more info.
  */
  return eventChannel((emit) => {
    socket.on(SOCKET_CHAT_EVENT, (message) => {
      emit(sagaReceiveMessage(message));
    });
    // The subscriber must return an unsubscribe function
    return () => { /* handle socket disconnection */ };
  });
}

function* listenSocketSaga(socket) {
  const socketChannel = yield call(listenSocket, socket);
  try {
    /* eslint no-constant-condition: ["error", { "checkLoops": false }]*/
    while (true) {
      // take(END) will cause the saga to terminate by jumping to the finally block
      const payload = yield take(socketChannel);
      switch (payload.type) {
        case CHAT_SAGA_RCV_MSG_ACTION :
          yield put(receiveMessageAction(payload.message));
          break;
        default:
          break;
      }
    }
  } catch (e) {
    console.error('listenSocketSaga', e); // eslint-disable-line
  }
}

function* emitSocketSaga(socket) {
  /* eslint no-constant-condition: ["error", { "checkLoops": false }]*/
  while (true) {
    const action = yield take('*');
    switch (action.type) {
      case CHAT_CONT_SEND_MSG_ACTION:
        socket.emit(SOCKET_CHAT_EVENT, { message: action.message });
        break;
      default:
        break;
    }
  }
}

export default function* watchSocket() {
  const socket = io.connect(SOCKET_URL);
  // Generate socket listener and emitter in parallel
  // const [listen, emit] =
  yield all([
    call(listenSocketSaga, socket),
    call(emitSocketSaga, socket),
  ]);
}
