var path = require('path');
var express = require('express');

var http = require('http');
var Twitter = require('twitter');

var twitterConfig = require('./twitter.config');

var app = express();

var twitterClient = new Twitter(twitterConfig);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'app/index.html'));
});

var server = http.createServer(app).listen(9000, function() {
  console.log('Listening at http://localhost:9000');
});

var io = require('socket.io').listen(server);


twitterClient.stream('statuses/filter', {
  track: 'usa,us'
}, function(stream) {
  stream.on('data', function(tweet) {
    // We emit socket events, st the client can listen to them
    io.emit('tweet', tweet);
  });

  stream.on('error', function(err) {
    console.error(err);
  });
});
