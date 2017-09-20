const request = require('request');
const fs = require('fs');
const path = require('path');

const movies = [
  {title: 'Mean Girls'},
  {title: 'Hackers'},
  {title: 'The Grey'},
  {title: 'Sunshine'},
  {title: 'Ex Machina'},
];

exports.requestHandler = function(req, res) {
  const { url, method } = req;
  console.log(`Serving ${method} for ${url}`);

  if (method === 'GET' || method === 'OPTIONS') {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // res.setHeader('Content-Type', 'application/json');

    if (url === '/api/movies') {
      res.statusCode = 200;
      res.end(JSON.stringify(movies));
    } else if (url.startsWith('/')) {
      let urlPath = path.join(__dirname, '../')
      if (url === '/') {
        urlPath += 'index.html';
      } else {
        urlPath += url.slice(1);
      }
      fs.readFile(urlPath, (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.end();
        } else {
          res.statusCode = 200;
          res.end(data.toString());
        }
      })
    }
  } else {
    res.end('hello world');
  }
}
