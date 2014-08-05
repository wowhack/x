var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var WebSocketServer = require("ws").Server;
var http = require("http");

var app = express();
app.use(bodyParser());

app.use(express.static(path.join(__dirname, 'public')));

var board = {
  boardId: 1,
  items: [
    {
      type: 'IMAGE',
      url: 'http://d1.dn-static.se/UploadedImages/2014/8/4/5505ef2c-6bc9-4479-8448-370c50a8cbac/original.jpg',
      position: {
        x: 500,
        y: 200
      }
    },
    {
      type: 'YOUTUBE',
      videoId: 'PTKIEr6V__k'
    },
    {
      type: 'SPOTIFY',
      uri: 'spotify:track:6TC8cblDfRetSnRFpJlMdX'
    }
  ]
};

var server = http.createServer(app);

var wss = new WebSocketServer({server: server});
console.log("websocket server created");

wss.on("connection", function (ws) {
  console.log("websocket connection open");
  ws.on("close", function () {
    console.log("websocket connection closed");
  });
});

wss.broadcast = function (data) {
  console.log('broadcasting: ' + data);
  for (var i in this.clients) {
    this.clients[i].send(JSON.stringify(data));
  }
};

var router = express.Router();
router.route('/board')
  .get(function (req, res) {
    res.json(board);
  }).post(function (req, res) {
    console.log(req.body);
    board.items.push(req.body);
    wss.broadcast(req.body);
    res.json({});
  });

app.use('/', router);

var port = process.env.PORT || 8080;
server.listen(port);
console.log('running on port ' + port);
