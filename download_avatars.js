// Github API
// https://api.github.com

// access token:
// 8e5e59947a26ba3a327874837b86c71a22df38a1



var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
  // ...
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});


