require("dotenv").config();



var twitter = require("twitter");
var spotify = require("node-spotify-api");
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");


var command = process.argv[2];
var songName = process.argv[3];

var client = new twitter(keys.twitter);
var spotifyClient = new spotify(keys.spotify);



//Displays tweets
function showTweets() {
    var params = { screen_name: 'AlecHomework' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (let i = 0; i < tweets.length; i++) {
                console.log("Tweet: " + tweets[i].text);
                console.log("Date: " + tweets[i].created_at)
                console.log("\n -------------------");
            }
        };
    });
};


function spotify() {
    
    spotifyClient.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (var i = 0; i < data.tracks.items.length; i++) {
            console.log("Song name: " + data.tracks.items[i].name);
            console.log("Artist(s): " + data.tracks.items[i].album.artists[0].name);
            console.log("Spotify Preview link: " + data.tracks.items[i].album.external_urls.spotify);
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log("\n -------------------");
        }
    });
}

switch(command){
    case "my-tweets":
      showTweets();
    break;

    case "spotify-this-song":
    spotify();
    break;

    };