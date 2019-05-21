module.exports = (socket) => {

	let onRain = () => {
		if (!socket.mcbot) { return; }
	
		if (socket.mcbot.entity.isRaining) {
			socket.emit('buffer:info', `It started raining.`);
		} else {
			socket.emit('buffer:info', `It stopped raining.`);
		}
	};

	socket.mcbot.on('spawn', onRain);

};
