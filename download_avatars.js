var request = require('request');
var secretToken = require('./secrets')

console.log('Welcome to the GitHub Avatar Downloader!');


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

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  result.forEach(function(user) {
    console.log(`${user.login}'s Avatar URL is: ${user.avatar_url}`);
  });

});