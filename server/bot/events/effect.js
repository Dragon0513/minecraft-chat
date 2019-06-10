module.exports = (socket) => {

    let onEffect = (isEnd, _, effect) => {
        socket.emit('bot:effect', { ...effect, isEnd });
    };

    socket.mcbot.on('entityEffect', onEffect.bind({}, false));
    socket.mcbot.on('entityEffectEnd', onEffect.bind({}, true));

};
