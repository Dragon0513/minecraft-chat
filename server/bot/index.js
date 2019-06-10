const error = require('./events/error');
const login = require('./events/login');
const session = require('./events/session');
const spawn = require('./events/spawn');
const message = require('./events/message');
const end = require('./events/end');
const death = require('./events/death');
const rain = require('./events/rain');
const hud = require('./events/hud');
const move = require('./events/move');
const kicked = require('./events/kicked');
const effect = require('./events/effect');
const players = require('./events/players');

module.exports = (socket) => {
  error(socket);
  login(socket);
  session(socket);
  spawn(socket);
  message(socket);
  end(socket);
  death(socket);
  rain(socket);
  move(socket);
  hud(socket);
  kicked(socket);
  effect(socket);
  players(socket);
};
