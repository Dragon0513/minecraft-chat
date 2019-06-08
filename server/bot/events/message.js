const parseVanilla = require('../../parsers/vanilla');
const parseExtra = require('../../parsers/extra');
const escapeHtml = require('../../utils/escapeHtml');

module.exports = (socket) => {

  let onMessage = (rawMessage) => {

    // empty message
    var message = '';


    // parse for json objects with 'extra'
    if (rawMessage.extra) {
      message = parseExtra(rawMessage.extra);

      // if the text comes clean
    } else if (rawMessage.text) {
      message = rawMessage.text;

      // if the rawMessage is vanilla
    } else if (rawMessage.translate) {
      message = parseVanilla(rawMessage);

      // the message format is not handled (yet)
    } else {
      return;
    }


    // if none of the parsers returned anything, stop here
    if (!message) return;

    // escape any html in the message
    message = escapeHtml(message);

    // format the message with the correct coloring and format whitespace
    message = message.replace(/§([0-9abcdef])([^§]*)/ig, (regex, color, msg) => {
      msg = msg.replace(/ /g, '&nbsp;');
      return `<span class="mc-color-${color}">${msg}</span>`;
    });

    message = message.replace(/((([A-Za-z]{3,9}:(?:\/\/))(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.))((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\-\.\!\/\\\w]*))?)/gi, (regex) => {
      return `<a href="${regex}" target="_blank">${regex}</a>`;
    });

    // send line back to the client
    socket.emit('message:chat', message);

  };

  socket.mcbot.on('message', onMessage);
};
