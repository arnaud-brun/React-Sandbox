/* eslint-disable global-require */

/**
 * Socket middleware
 */
module.exports = (app, port, logger) => {
  const server = require('http').createServer(app);
  const io = require('socket.io')(server);
  server.listen(port);

  // Create a chat on '/chat' with specific event
  const chat = io.of('/chat');
  const chatEvent = 'SOCKET_CHAT_EVENT';
  chat.on('connection', (socket) => {
    socket.broadcast.emit('New user connected');
    socket.on(chatEvent, (message) => {
      logger.log('MSG received from connected client: ');
      logger.log(message);
      socket.emit(chatEvent, message);
      socket.broadcast.emit(chatEvent, message);
    });
  });
};
