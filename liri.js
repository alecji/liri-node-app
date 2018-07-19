require("dotenv").config();



var twitter = require("twitter");
//var spotify = require("spotify");
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");


var command = process.argv[2];
var inputTwo = process.argv[3];

var client = new twitter(keys.twitter);
//var spotify = new Spotify(keys.spotify);


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






// In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

// ### Before You Begin

// 1. LIRI will display your latest tweets. As we do not want to display your personal account, or its keys, please make an alias account and add a few tweets to it!

// **** 2. Make a new GitHub repository called liri-node-app and clone it to your computer.

// 3. To retrieve the data that will power this app, you'll need to send requests to the Twitter, Spotify and OMDB APIs. You'll find these Node packages crucial for your assignment.

//    * [Twitter](https://www.npmjs.com/package/twitter)

//    * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

//    * [Request](https://www.npmjs.com/package/request)

//      * You'll use Request to grab data from the [OMDB API](http://www.omdbapi.com).

//    * [DotEnv](https://www.npmjs.com/package/dotenv)

// ### Submission on BCS

// * Please submit the link to the Github Repository!

// ### Instructions

// 1. Navigate to the root of your project and run `npm init -y` &mdash; this will initialize a `package.json` file for your project. The `package.json` file is required for installing third party npm packages and saving their version numbers. If you fail to initialize a `package.json` file, it will be troublesome, and at times almost impossible for anyone else to run your code after cloning your project.

// 2. Make a .gitignore file and add the following lines to it. This will tell git not to track these files, and thus they won't be committed to Github.

// ```
// node_modules
// .DS_Store
// .env
// ```

// 3. Make a JavaScript file named `keys.js`.

// * Inside keys.js your file will look like this:

// ```js
// console.log('this is loaded');

// exports.twitter = {
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
// };

// exports.spotify = {
//   id: process.env.SPOTIFY_ID,
//   secret: process.env.SPOTIFY_SECRET
// };
// ```

// 4. Next, create a file named `.env`, add the following to it, replacing the values with your API keys (no quotes) once you have them:

// ```js
// # Spotify API keys

// SPOTIFY_ID=your-spotify-id
// SPOTIFY_SECRET=your-spotify-secret

// # Twitter API keys

// TWITTER_CONSUMER_KEY=your-twitter-consumer-key
// TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
// TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
// TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret

// ```

// * This file will be used by the `dotenv` package to set what are known as environment variables to the global `process.env` object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github &mdash; keeping our API key information private.

// * If someone wanted to clone your app from github and run it themselves, they would need to supply their own `.env` file for it to work.

// 7. Make a JavaScript file named `liri.js`.

// 8. At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package:

// ```js
// require("dotenv").config();
// ```

// 9. Add the code required to import the `keys.js` file and store it in a variable.

// * You should then be able to access your keys information like so

//   ```js
//   var spotify = new Spotify(keys.spotify);
//   var client = new Twitter(keys.twitter);
//   ```

// 10. Make it so liri.js can take in one of the following commands:

//     * `my-tweets`

//     * `spotify-this-song`

//     * `movie-this`

//     * `do-what-it-says`

// ### What Each Command Should Do

// 1. `node liri.js my-tweets`

//    * This will show your last 20 tweets and when they were created at in your terminal/bash window.

// 2. `node liri.js spotify-this-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window

//      * Artist(s)

//      * The song's name

//      * A preview link of the song from Spotify

//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.

//    * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.

//    * Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

//    * Step One: Visit <https://developer.spotify.com/my-applications/#!/>

//    * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

//    * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

//    * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

// 3. `node liri.js movie-this '<movie name here>'`

//    * This will output the following information to your terminal/bash window:

//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

//      * It's on Netflix!

//    * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

// 4. `node liri.js do-what-it-says`

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Feel free to change the text in that document to test out the feature for other commands.

// ### BONUS

// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

// * Make sure you append each command you run to the `log.txt` file. 

// * Do not overwrite your file each time you run a command.