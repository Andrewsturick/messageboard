'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    name: String,
    message: String,
    date: String,
});

var Message = mongoose.model('Message', messageSchema);




module.exports = Message;
