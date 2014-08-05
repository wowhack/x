var REDIRECT_URL = "https://play.spotify.com/user/surp/playlist/7bHQGUIY2Biplr9sKVlGSr";
var SPOTIFY_URI = "spotify:track:";

var SPOTIFY_ENDPOINT = "https://api.spotify.com/v1";

var MUSIXMATCH_KEY = "&apikey=3504b47f65820926017b77475afea890";
var MATCH_ENDPOINT = "http://api.musixmatch.com/ws/1.1/";

var MOCK_TOKEN = "3gN4UFoOnRHlMl3K4kU5zG";

var Spotify = {
  pangpang : function(id) {
    $.get(SPOTIFY_ENDPOINT + "/tracks/" + id,
      function(resp) {
        MusixMatch.trackId({
          name: resp.name,
          artist: resp.artists[0].name
        });
      });
  },
  getToken : function() {
    var arrrrrs = $("#copy-url").data("clipboardText").split("/");
    return arrrrrs[arrrrrs.length -1];
  }
};

var MusixMatch = {
  trackId: function(track) {
    $.get(MATCH_ENDPOINT + "track.search?q_track=" +
      track.name + "&q_artist=" + track.artist +
      MUSIXMATCH_KEY,
    function(resp) {
      MusixMatch.snap(JSON.parse(resp).message.body.track_list[0].track.track_id);
    });
  },
  snap : function(track_id) {
    $.get(MATCH_ENDPOINT + "track.snippet.get?track_id=" +
    track_id + MUSIXMATCH_KEY, function(resp) {
      $.post("http://xteamshitboard.herokuapp.com/board", {
        type: "TEXT",
        content: JSON.parse(resp).message.body.snippet.snippet_body
      }, function() {
        window.top.location.href = REDIRECT_URL;
      });
    });
  }
};


$(".dropdown-interior-menu")
.append("<li><a class='moody' href='#'>Add track to my moodboard</a></li>")
.append("<li><a class='lyric' href='#'>Add lyric to my moodboard</a></li>");


$(".moody").click(function(e) {
  e.preventDefault();
  $.post("http://xteamshitboard.herokuapp.com/board", {
    type: "SPOTIFY",
    uri: SPOTIFY_URI + Spotify.getToken()
  }, function() {
    window.top.location.href = REDIRECT_URL;
  });
});


$(".lyric").click(function(e) {
  e.preventDefault();
  Spotify.pangpang(Spotify.getToken());
  //Spotify.pangpang(MOCK_TOKEN);
});
