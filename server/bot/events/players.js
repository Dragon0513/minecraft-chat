module.exports = (socket) => {

  let onPlayers = (state, player) => {
    socket.emit('bot:players', {
      username: player.username,
      uuid: player.uuid,
      ping: player.ping
    }, state);
  };

  socket.mcbot.on('playerJoined', onPlayers.bind({}, 'joined'));
  socket.mcbot.on('playerLeft', onPlayers.bind({}, 'left'));
};
