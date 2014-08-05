var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.use(bodyParser());

app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 8080;

var router = express.Router();

var board = {
  boardId: 1,
  items: [{
    type: 'IMAGE',
    url: 'http://d1.dn-static.se/UploadedImages/2014/8/4/5505ef2c-6bc9-4479-8448-370c50a8cbac/original.jpg',
    position: {
      x: 500,
      y: 200
    }
  }]
};

router.route('/board')
  .get(function(req, res) {
    res.json(board);
  }).post(function(req, res) {
    console.log(req.body.test);
    board.items.push(req.body);
    res.json({});

  });

app.use('/', router);

app.listen(port);
console.log('running on port ' + port);
