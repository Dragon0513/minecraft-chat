module.exports = (socket) => {

  let ondeath = () => {
    if (!socket.mcbot) { return; }

    var pos = socket.mcbot.entity.position;
    socket.emit('message:info', `You have been dead in X:${pos.x}, Y:${pos.y}, Z:${pos.z} `);
  };

  socket.mcbot.on('death', ondeath);
};
