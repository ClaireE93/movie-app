const request = require('request');
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const path = require('path');
const netflix = require('../src/netflixHelper')

// NOTE: Flow for the app:
// Client "adds" a movies
// Server stores that query as "client's request" in local database
// Server makes netflix API call and serves that data up
// Could also STORE netflix data in local database



exports.requestHandler = function(req, res) {
  const { url, method } = req;
  console.log(`Serving ${method} for ${url}`);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // res.setHeader('Content-Type', 'application/json');

  if (method === 'GET' || method === 'OPTIONS') {

    if (url === '/api/movies') {
      fs.readFileAsync('./movieData/data.js')
      .then((data) => {
        return data; //Keep this .then() in case any parsing is needed
      })
      .then((data) => {
        res.statusCode = 200;
        res.end(data);
      })
      .catch((err) => {
        res.statusCode = 400;
        res.end(err);
      })
    } else if (url.startsWith('/')) {
      let urlPath = path.join(__dirname, '../')
      if (url === '/') {
        urlPath += 'index.html';
      } else {
        urlPath += url.slice(1);
      }
      fs.readFileAsync(urlPath)
      .then((data) => {
        res.statusCode = 200;
        res.end(data.toString());
      })
      .catch((err) => {
        res.statusCode = 404;
        res.end();
      });
    }
  } else if (method === 'POST') {
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      const title = JSON.parse(body).title;
      const reqUrl = `http://netflixroulette.net/api/api.php?title=${title}`;
      request(reqUrl, function (error, response, body) {
        res.statusCode = 200;
        res.end(body);
      });
    });

  } else {
    res.end('hello world');
  }
}
