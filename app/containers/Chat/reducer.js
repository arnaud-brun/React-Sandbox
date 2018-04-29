/*
 *
 * Chat reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHAT_CONT_RCV_MSG_ACTION,
} from './constants';

const initialState = fromJS({});

function chatReducer(state = initialState, action) {
  switch (action.type) {
    case CHAT_CONT_RCV_MSG_ACTION: {
      // Messages list empty
      if (!state.messages) {
        return Object.assign({}, state, {
          messages: [action.message],
        });
      }
      // Push new messages
      const messages = state.messages.slice();
      messages.push(action.message);
      return Object.assign({}, state, {
        messages,
      });
    }
    default: {
      return state;
    }
  }
}

export default chatReducer;
