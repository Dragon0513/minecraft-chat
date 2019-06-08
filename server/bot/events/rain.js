module.exports = (socket) => {

	let onRain = () => {
		if (!socket.mcbot) { return; }

		if (socket.mcbot.isRaining) {
			socket.emit('message:info', `It started raining.`);
		} else {
			socket.emit('message:info', `It stopped raining.`);
		}
	};

	socket.mcbot.on('rain', onRain);

};
