/**
  * La lallalalala
  *
*/

var Moodify = {
  contextHandler: function(image, tab) {
    Moodify.push(image.srcUrl);
  },
  push: function(url) {
    $.post("http://agile-plains-5375.herokuapp.com/board", {
    type: "IMAGE",
    url: url
  });
  }
}



chrome.contextMenus.create({
	title: "Add to my moodboard",
	contexts: ["image"],
	onclick: Moodify.contextHandler
});