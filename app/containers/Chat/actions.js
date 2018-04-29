/*
 *
 * Chat actions
 *
 */

import {
  CHAT_CONT_SEND_MSG_ACTION,
  CHAT_CONT_RCV_MSG_ACTION,
  CHAT_SAGA_RCV_MSG_ACTION,
} from './constants';


export function sendMessageAction(sender, content) {
  return {
    type: CHAT_CONT_SEND_MSG_ACTION,
    message: {
      sender,
      content,
    },
  };
}

export function receiveMessageAction(message) {
  return {
    type: CHAT_CONT_RCV_MSG_ACTION,
    message,
  };
}

export function sagaReceiveMessage(message) {
  return {
    type: CHAT_SAGA_RCV_MSG_ACTION,
    ...message,
  };
}
