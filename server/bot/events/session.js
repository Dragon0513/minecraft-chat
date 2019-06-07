const lowdb = require('../../lowdb');

module.exports = (socket) => {

  let onSession = (session) => {
    const profile = {
      accessToken: session.accessToken,
      clientToken: session.clientToken,
      selectedProfile: {
        id: session.selectedProfile.id,
        name: session.selectedProfile.name
      }
    }

    lowdb.profiles.insert({
      username: socket.connectionParams.username,
      ...profile,
    });
  }

  socket.mcbot._client.once('session', onSession);

};
