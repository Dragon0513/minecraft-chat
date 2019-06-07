const mineflayer = require('mineflayer');
const moment = require('moment');
const events = require('../../bot');
const lowdb = require('../../lowdb');

module.exports = (socket) => {

  let onConnection = async (data) => {

    let timestamp = moment().format('MMM D h:mm:ss a');

    // log activity to console
    console.log(`${timestamp}: connecting > ${data.host}:${data.port} - ${data.version} - ${data.username}`);

    // inform user that connection is being made
    socket.emit('buffer:info', `Connecting to ${data.version} server ${data.host}:${data.port}`);

    // if a bot already exists, ask user to disconnect
    if (socket.mcbot) {
      socket.emit('buffer:error', 'Please disconnect before connecting again');
      return;
    }

    let connectionParams = {
      username: data.username,
      host: data.host,
      port: data.port,
      version: data.version
    };
    if (data.method === 'password') {
      connectionParams = {
        ...connectionParams,
        password: data.password,
      };
    } else if (data.method === 'session') {
      const session = lowdb.profiles.get.byId(data._id);
      connectionParams = {
        ...connectionParams,
        session: session
      };
    }

    // create a mineflayer bot and store it in the client's socket
    socket.mcbot = await mineflayer.createBot(connectionParams);

    // store connection params in socket
    socket.connectionParams = connectionParams;

    // bind bot events
    events(socket);

  };

  socket.on('server:connect', onConnection);

};
