const request = require('request');
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const path = require('path');



exports.requestHandler = function(req, res) {
  const { url, method } = req;
  console.log(`Serving ${method} for ${url}`);

  if (method === 'GET' || method === 'OPTIONS') {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // res.setHeader('Content-Type', 'application/json');

    if (url === '/api/movies') {
      fs.readFileAsync('./movieData/data.js')
      .then((data) => {
        return data;
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
  } else {
    res.end('hello world');
  }
}
