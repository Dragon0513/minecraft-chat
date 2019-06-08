module.exports = (socket) => {

    let onTabComplete = (input, callback) => {
        if (socket.mcbot && socket.mcbot.entity) {
            socket.mcbot.tabComplete(input, callback, false, false);
        }
    }

    socket.on('bot:tabComplete', onTabComplete);
};
