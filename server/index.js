// load environment files from .env file
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const port = parseInt(process.env.PORT, 10) || 3000;

// database
const lowdb = require('./lowdb');

// express server
const app = require('express')();
const server = require('http').createServer(app);

// socket.io server
const io = require('socket.io')(server);
require('./sockets')(io);

// next.js
const development = process.env.NODE_ENV !== 'production';
const nextApp = require('next')({ dev: development });
const nextHandler = nextApp.getRequestHandler();

// parser
const bodyParser = require('body-parser');

nextApp.prepare().then(() => {
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    const profiles = lowdb.profiles.get.all().map(profile => ({
      _id: profile._id,
      username: profile.username,
      clientToken: profile.clientToken.split('-')[0]
    }));
    const servers = lowdb.servers.get.all().map(server => ({
      host: server.host,
      port: server.port,
      version: server.version,
    }));
    req.db = { profiles, servers };

    return nextHandler(req, res, '/index');
  });

  app.get('*', (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, err => {
    if (err) { throw err; }
    console.log(`[!] Ready on http://localhost:${port}`);
  });
});
