var board = {
  boardId: 1,
  items: []
};

exports.getBoard = function() {
  return board;
};

exports.addItem = function(item) {
  board.items.push(item);
};

