module.exports = (socket) => {

    let onEffect = (entity, effect) => {
        socket.emit('bot:effect', {...effect, isEnd: false});
    };

    socket.mcbot.on('entityEffect', onEffect);


    let onEffectEnd = (entity, effect) => {
        socket.emit('bot:effectEnd', {...effect, isEnd: true});
    };

    socket.mcbot.on('entityEffectEnd', onEffectEnd);

};
