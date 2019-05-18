const { Profiles } = require('../../model');

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

    Profiles.updateMany({ username: socket.connectionParams.username }, {
      username: socket.connectionParams.username,
      ...profile,
    }, { upsert: true }, (err) => {
      if (err) throw (err);
    });
  }

  socket.mcbot._client.once('session', onSession);

};
