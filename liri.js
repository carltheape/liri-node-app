var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require('twitter');
var request = require("request");
var Spotify = require("node-spotify-api");
var type = (process.argv[2]);
var nodeArgs = process.argv;
var song = "the sign ace of base";
var movieName = "mr nobody";


var twitClient = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});

var spotify = new Spotify({
    id: keys.spotifyKeys.client_id,
    secret: keys.spotifyKeys.client_secret
});

if (type === "my-tweets") {
    var params = { screen_name: 'TestyMcgoo' };
    twitClient.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            for (var i = 0; i < tweets.length; i++) {
                console.log("------------------------------------")
                console.log("\n" + 20 - i + " " + tweets[i].text);
                console.log(tweets[i].created_at);
                fs.appendFile("log.txt", "\n" + 20 - i + " " + tweets[i].text + "," + tweets[i].created_at + ",", function(err) {

                    // If the code experiences any errors it will log the error to the console.
                    if (err) {
                        return console.log(err);
                    }

                    // Otherwise, it will print: "movies.txt was updated!"
                    console.log("log.txt was updated!");

                });
            }

        }
    })
} else if (type === "spotify-this-song") {
    if (process.argv[3] != undefined) {
        song = '';
        for (var i = 3; i < nodeArgs.length; i++) {

            if (i > 3 && i < nodeArgs.length) {

                song = song + "+" + nodeArgs[i];

            } else {

                song += nodeArgs[i];

            }
        }

    }

    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(song);
        // console.log(process.argv[3])
        // console.log(data.tracks.items[0]);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].album.external_urls);
        fs.appendFile("log.txt", data.tracks.items[0].name + "," + data.tracks.items[0].artists[0].name + "," + data.tracks.items[0].album.name + "," + data.tracks.items[0].album.external_urls + ",", function(err) {

            // If the code experiences any errors it will log the error to the console.
            if (err) {
                return console.log(err);
            }

            // Otherwise, it will print: "movies.txt was updated!"
            console.log("log.txt was updated!");

        });
    });

} else if (type === "movie-this") {
    if (process.argv[3] != undefined) {
        movieName = '';
        for (var i = 3; i < nodeArgs.length; i++) {

            if (i > 3 && i < nodeArgs.length) {

                movieName = movieName + "+" + nodeArgs[i];

            } else {

                movieName += nodeArgs[i];

            }
        }

    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
    request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            // console.log(movieName);
            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log(JSON.parse(body).Ratings[0]);
            console.log(JSON.parse(body).Ratings[1]);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);
            fs.appendFile("log.txt", JSON.parse(body).Title + "," + JSON.parse(body).Year + "," + JSON.parse(body).Ratings[0] + "," + JSON.parse(body).Ratings[1] + "," + JSON.parse(body).Country + "," + JSON.parse(body).Language + "," + JSON.parse(body).Plot + "," + JSON.parse(body).Actors + ",", function(err) {

                // If the code experiences any errors it will log the error to the console.
                if (err) {
                    return console.log(err);
                }

                // Otherwise, it will print: "movies.txt was updated!"
                console.log("log.txt was updated!");

            });
        }
    });


} else if (type === "do-what-it-says") {

    fs.readFile("./random.txt", "utf8", function(error, data) {

        var dataArr = data.split(",");
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // // We will then print the contents of data
        // console.log(data);

        // Then split it by commas (to make it more readable)

        if (dataArr[0] === "spotify-this-song") {
            spotify.search({ type: 'track', query: dataArr[1] }, function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                // console.log(song);
                // console.log(process.argv[3])
                // console.log(data.tracks.items[0]);
                console.log(data.tracks.items[0].name);
                console.log(data.tracks.items[0].artists[0].name);
                console.log(data.tracks.items[0].album.name);
                console.log(data.tracks.items[0].album.external_urls);
                fs.appendFile("log.txt", data.tracks.items[0].name + "," + data.tracks.items[0].artists[0].name + "," + data.tracks.items[0].album.name + "," + data.tracks.items[0].album.external_urls + ",", function(err) {

                    // If the code experiences any errors it will log the error to the console.
                    if (err) {
                        return console.log(err);
                    }

                    // Otherwise, it will print: "movies.txt was updated!"
                    console.log("log.txt was updated!");

                });

            })
        } else if (dataArr[0] === "movie-this") {
            if (dataArr[1] != undefined) {
                movieName = '';
                for (var i = 1; i < dataArr.length; i++) {

                    if (i > 1 && i < dataArr.length) {

                        movieName = movieName + "+" + dataArr[i];

                    } else {

                        movieName += dataArr[i];

                    }
                }

            }
            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
            request(queryUrl, function(error, response, body) {

                // If the request is successful
                if (!error && response.statusCode === 200) {

                    // Parse the body of the site and recover just the imdbRating
                    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                    // console.log(movieName);
                    console.log(JSON.parse(body).Title);
                    console.log(JSON.parse(body).Year);
                    console.log(JSON.parse(body).Ratings[0]);
                    console.log(JSON.parse(body).Ratings[1]);
                    console.log(JSON.parse(body).Country);
                    console.log(JSON.parse(body).Language);
                    console.log(JSON.parse(body).Plot);
                    console.log(JSON.parse(body).Actors);
                    fs.appendFile("log.txt", JSON.parse(body).Title + "," + JSON.parse(body).Year + "," + JSON.parse(body).Ratings[0] + "," + JSON.parse(body).Ratings[1] + "," + JSON.parse(body).Country + "," + JSON.parse(body).Language + "," + JSON.parse(body).Plot + "," + JSON.parse(body).Actors + ",", function(err) {

                        // If the code experiences any errors it will log the error to the console.
                        if (err) {
                            return console.log(err);
                        }

                        // Otherwise, it will print: "movies.txt was updated!"
                        console.log("log.txt was updated!");

                    });
                }
            });


        } else if (dataArr[0] === "my-tweets") {
            var params = { screen_name: 'TestyMcgoo' };
            twitClient.get('statuses/user_timeline', params, function(error, tweets, response) {
                if (!error) {
                    // console.log(tweets);
                    for (var i = 0; i < tweets.length; i++) {
                        console.log("------------------------------------")
                        console.log("\n" + 20 - i + " " + tweets[i].text);
                        console.log(tweets[i].created_at);
                        fs.appendFile("log.txt", "\n" + 20 - i + " " + tweets[i].text + "," + tweets[i].created_at + ",", function(err) {

                            // If the code experiences any errors it will log the error to the console.
                            if (err) {
                                return console.log(err);
                            }

                            // Otherwise, it will print: "movies.txt was updated!"
                            console.log("log.txt was updated!");

                        });
                    }

                }
            })


        }
    })
} else { console.log("need more info") };