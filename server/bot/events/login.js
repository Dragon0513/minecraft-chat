const moment = require('moment');
const lowdb = require('../../lowdb');

module.exports = (socket) => {

  let onLogin = () => {
    let timestamp = moment().format('MMM D h:mm:ss a');

    const hostdata = {
      host: socket.connectionParams.host,
      port: socket.connectionParams.port
    };

    socket.emit('message:success', `Successfully logged in as ${socket.mcbot.username} with entity id ${socket.mcbot.entity.id}`);
    socket.emit('bot:connect', {
      ...hostdata,
      username: socket.mcbot.username,
      version: socket.connectionParams.version
    });
    console.log(`${timestamp}: logged in > ${socket.connectionParams.host}:${socket.connectionParams.port} - Username: ${socket.mcbot.username}`);

    lowdb.servers.insert({
      ...hostdata,
      version: socket.connectionParams.version
    });
  };

  socket.mcbot.on('login', onLogin);

};
