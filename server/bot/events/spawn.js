module.exports = (socket) => {

  let onSpawn = () => {
    if (!socket.mcbot) { return; }

    var pos = socket.mcbot.entity.position;
    socket.emit('message:info', `Spawned at X:${pos.x}, Y:${pos.y}, Z:${pos.z}`);
    socket.emit('bot:players', socket.mcbot.players);
  };

  socket.mcbot.on('spawn', onSpawn);

};
