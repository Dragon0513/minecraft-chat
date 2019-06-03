const moment = require('moment');

module.exports = (socket) => {

  let onDisconnection = () => {
    let timestamp = moment().format('MMM D h:mm:ss a');

    if (socket.mcbot) {
      socket.emit('buffer:info', `Disconnect server`);
      console.log(`${timestamp}: disconnect > ${socket.connectionParams.host}:${socket.connectionParams.port} - Username: ${socket.mcbot.username}`);

      socket.mcbot.end();
      delete socket.mcbot;
    }
  };

  socket.on('disconnect', onDisconnection);
  socket.on('bot:disconnect', onDisconnection);

};
