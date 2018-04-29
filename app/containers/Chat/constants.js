/*
 *
 * Chat constants
 *
 * 2 types of actions
 * For the Chat React container [CHAT_CONT_***_ACTION]
 * For the Saga related to the Chat React container [CHAT_SAGA_***_ACTION]
 *
 * 1 type of event
 * For the remote Socket handling the chat back-end [SOCKET_***_EVENT]
 *
 */

// Chat React container actions
export const CHAT_CONT_SEND_MSG_ACTION = 'app/Chat/CONT_SEND_MSG_ACTION';
export const CHAT_CONT_RCV_MSG_ACTION = 'app/Chat/CONT_RCV_MSG_ACTION';

// Saga related to chat actions
export const CHAT_SAGA_SEND_MSG_ACTION = 'app/Chat/SAGA_SEND_MSG_ACTION';
export const CHAT_SAGA_RCV_MSG_ACTION = 'app/Chat/SAGA_RCV_MSG_ACTION';

// Socket communication URL and event to listen to
export const SOCKET_URL = 'http://localhost/chat';
export const SOCKET_CHAT_EVENT = 'SOCKET_CHAT_EVENT';
