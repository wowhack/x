/**
  * La lallalalala
  *
*/

function image(image, tab) {
  $.post("http://xteamshitboard.herokuapp.com/board", {
    type: "IMAGE",
    url: image.srcUrl
  });
}

function code(text, tab) {
  /**
  $.post("http://xteamshitboard.herokuapp.com/board", {
    type: "CODE",
    content: text.selectionText,
    codeLang: "Scala"
  });
  **/
  console.log(window.getSelection().toString());
}

chrome.contextMenus.create({
	title: "Add image to my moodboard",
	contexts: ["image"],
	onclick: image
});

chrome.contextMenus.create({
  title: "Add code to my moodboard",
  contexts: ["selection"],
  onclick: code
});
