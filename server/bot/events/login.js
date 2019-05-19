const moment = require('moment');
const { Servers } = require('../../model');

module.exports = (socket) => {

  let onLogin = () => {
    let timestamp = moment().format('MMM D h:mm:ss a');

    socket.emit('buffer:success', `Successfully logged in as ${socket.mcbot.username} with entity id ${socket.mcbot.entity.id}`);
    socket.emit('bot:connect', {
      host: socket.connectionParams.hostname,
      port: socket.connectionParams.port,
      username: socket.mcbot.username,
      version: socket.connectionParams.version
    });
    console.log(`${timestamp}: logged in > ${socket.connectionParams.hostname}:${socket.connectionParams.port} - Username: ${socket.mcbot.username}`);


    const hostdata = {
      host: socket.connectionParams.hostname,
      port: socket.connectionParams.port,
      version: socket.connectionParams.version
    };
    Servers.updateMany(hostdata, hostdata, { upsert: true }, (err) => {
      if (err) throw (err);
    });
  };

  socket.mcbot.on('login', onLogin);

};
