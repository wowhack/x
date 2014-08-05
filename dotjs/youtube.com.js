$(".html5-context-menu").append("<li id='moody' class='yt-uix-button-menu-item'>Add to my moodboard</li>");
$("#moody").click(function() {
  var URL = location.href;

  console.log("POSTADE: " + URL.split("=")[1]);

  $.post("http://xteamshitboard.herokuapp.com/board", {
    type: "YOUTUBE",
    videoId: URL.split("=")[1]
  });

  $(".html5-context-menu").hide();
});
