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
    item.status = 'NEW_ITEM';
    if (typeof item.zindex === 'undefined') {
      item.zindex = getHighestZIndex() + 1;
    }
    if (typeof item.position === 'undefined') {
      item.position = getPositionForNewItem();
    }
    board.items.push(item);
  } else {
    for (var i = 0; i < board.items.length; i += 1) {
      var oldItem = board.items[i];
      if (oldItem.id === item.id) {
        item.status = 'OLD_ITEM';
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

exports.deleteItem = function(itemId) {

};

var getPositionForNewItem = function() {
  var newItemCount = 0;
  for (var i = 0; i < board.items.length; i += 1) {
    var item = board.items[i];
    if (item.status === 'NEW_ITEM') {
      newItemCount += 1;
    }
  }
  return {
    left: 100 + newItemCount * 60,
    top: 100 + newItemCount * 60
  };
};


var getHighestZIndex = function() {
  var highestZIndex = 2;
  for (var i = 0; i < board.items.length; i += 1) {
    var item = board.items[i];
    if (item.zindex > highestZIndex) {
      highestZIndex = item.zindex;
    }
  }
  return highestZIndex;
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
