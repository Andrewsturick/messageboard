'use strict';


var express = require('express');
var router = express.Router();
var Message = require('../models/message');

router.get('/', function(req, res){
  Message.find({}, function(err, messages){
      messages.reverse()
      res.render('messages', {title: 'Message Board', messageList: messages});
  })
})

router.delete('/', function(req, res){
  console.log(req.body);
  Message.remove(req.body, function(err){
    res.send()
  })
})


router.post('/', function(req, res){
  var messages = new Message(req.body);
  messages.save(function(err, savedMessage){
  })
  res.send();
})

router.put('/', function(req, res){
  console.log(req.body.timeStamp);
    Message.update(req.body.timeStamp, req.body.editMessage, function(err, message){
      res.send(message);
    })
})

module.exports = router;
