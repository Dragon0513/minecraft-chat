// load environment files from .env file
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const port = parseInt(process.env.PORT, 10) || 3000;

// MongoDB
const mongoose = require('mongoose');
const model = require('./model')
const { MONGO_HOST, MONGO_PORT, MONGO_NAME } = process.env;
const mongo_path = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`
mongoose.Promise = Promise;
mongoose.connect(mongo_path, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

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
  app.use((req, res, next) => {
    req.db = db;
    next()
  });

  app.get('*', (req, res) => {
    req.model = model;
    return nextHandler(req, res);
  });

  server.listen(port, err => {
    if (err) { throw err; }
    console.log(`[!] Ready on http://localhost:${port}`);
  });
});
