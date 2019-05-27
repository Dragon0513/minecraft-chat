const moment = require('moment');
const { Servers } = require('../../model');

module.exports = (socket) => {

  let onLogin = () => {
    let timestamp = moment().format('MMM D h:mm:ss a');

    const hostdata = {
      host: socket.connectionParams.host,
      port: socket.connectionParams.port
    };

    socket.emit('buffer:success', `Successfully logged in as ${socket.mcbot.username} with entity id ${socket.mcbot.entity.id}`);
    socket.emit('bot:connect', {
      ...hostdata,
      username: socket.mcbot.username,
      version: socket.connectionParams.version
    });
    console.log(`${timestamp}: logged in > ${socket.connectionParams.host}:${socket.connectionParams.port} - Username: ${socket.mcbot.username}`);

    Servers.updateMany(hostdata, {
      ...hostdata,
      version: socket.connectionParams.version
    }, { upsert: true }, (err) => {
      if (err) throw (err);
    });
  };

  socket.mcbot.on('login', onLogin);

};
