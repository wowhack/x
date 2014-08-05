var board = {
  boardId: 1,
  items: []
};

exports.getBoard = function() {
  return board;
};

exports.upsertItem = function(item) {
  if (typeof item.id === 'undefined') {
    item.id = generateUUID();
    board.items.push(item);
  } else {
    for (var i = 0; i < board.items.length; i += 1) {
      var oldItem = board.items[i];
      if (oldItem.id === item.id) {
        board.items[i] = item;
        break;
      }
    }
  }
  return item;
};

exports.getItem = function(itemId) {
  for (var i = 0; i < board.items.length; i += 1) {
    var item = board.items[i];
    if (item.id === itemId) {
      return item;
    }
  }
};



var generateUUID = function() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x7|0x8)).toString(16);
  });
  return uuid;
};
