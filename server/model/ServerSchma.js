var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
    host: {
        type: String,
        required: true
    },
    port: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true
    },
});
