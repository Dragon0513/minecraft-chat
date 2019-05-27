module.exports = (socket) => {

  let onHud = () => {
    if (!socket.mcbot) { return; }

    const datas = {
      health: socket.mcbot.health || 0,
      food: socket.mcbot.food || 0,
      saturation: socket.mcbot.foodSaturation || 0,
      level: socket.mcbot.experience.level || 0,
      points: socket.mcbot.experience.points || 0,
      progress: socket.mcbot.experience.progress || 0
    }

    socket.emit('bot:hud', datas);
  };

  socket.mcbot.on('health', onHud);
  socket.mcbot.on('experience', onHud);

};
