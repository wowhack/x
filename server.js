var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var WebSocketServer = require('ws').Server;
var http = require('http');
var boardStore = require('./in-memory-board-store');
var app = express();
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

boardStore.upsertItem({
  type: 'IMAGE',
  url: 'http://d1.dn-static.se/UploadedImages/2014/8/4/5505ef2c-6bc9-4479-8448-370c50a8cbac/original.jpg',
  position: {
    x: 500,
    y: 200
  }
});

boardStore.upsertItem({
  type: 'YOUTUBE',
  videoId: 'PTKIEr6V__k'
});

boardStore.upsertItem({
  type: 'SPOTIFY',
  uri: 'spotify:track:6TC8cblDfRetSnRFpJlMdX'
});


var server = http.createServer(app);

var wss = new WebSocketServer({server: server});
console.log("websocket server created");

wss.on("connection", function(ws) {
  console.log("websocket connection open");
  ws.on("close", function () {
    console.log("websocket connection closed");
  });
});

wss.broadcast = function(data) {
  console.log('broadcasting: ' + data);
  for (var i in this.clients) {
    this.clients[i].send(JSON.stringify(data));
  }
};

var router = express.Router();
router.route('/board')
  .get(function(req, res) {
    res.json(boardStore.getBoard());
  }).post(function(req, res) {
    var item = req.body;
    var newItem = boardStore.upsertItem(item);
    console.log('added item:');
    console.log(newItem);
    wss.broadcast(newItem);
    res.json({});
  }).put(function(req, res){
    var item = req.body;
    if (typeof item.id !== 'undefined') {
      var newItem = boardStore.upsertItem(item);
      console.log('updated item:');
      console.log(newItem);
    } else {
      console.log('item lacks id, refusing to update!');
    }
    res.json({});
  });

app.use('/', router);

var port = process.env.PORT || 8080;
server.listen(port);
console.log('running on port ' + port);
