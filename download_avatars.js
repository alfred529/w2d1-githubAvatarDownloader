var request = require('request');
var secretToken = require('./secrets')
var fs = require('fs');

var userLogin = process.argv[2];
var repoOwner = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

//---------------------------------------------------------------//

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${secretToken.GITHUB_TOKEN}`
    }
  };

  request(options, function(err, res, body) {
    var parsedStr = JSON.parse(body);
    cb(err, parsedStr);
  });
}

//---------------------------------------------------------------//
// this function downloads the image and will be called below

function downloadImageByURL(url, filePath) {
  request.get(url)
        .on('error', function (err) {
          throw err;
        })
        .on('response', function (response) {
          console.log('Response Status Code: ', response.statusCode);
        })
        .pipe(fs.createWriteStream(filePath))
}

//---------------------------------------------------------------//

getRepoContributors(userLogin, repoOwner, function(err, result) {
  console.log("Errors:", err);
  result.forEach(function(user) {
    //console.log(`${user.login}'s Avatar URL is: ${user.avatar_url}`);
    downloadImageByURL(user.avatar_url, `avatars/${user.login}.jpg`)
  });

});

