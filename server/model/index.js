var mongoose = require('mongoose');

module.exports = {
    Profiles: mongoose.model('profiles', require('./ProfileSchema')),
    Servers: mongoose.model('servers', require('./ServerSchma'))
}
