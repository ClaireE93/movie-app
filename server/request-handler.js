const request = require('request');
const fs = require('fs');
const path = require('path');

exports.requestHandler = function(req, res) {
  const { url, method } = req;
  console.log(`Serving ${method} for ${url}`);

  if (method === 'GET') {
    if (url.startsWith('/')) {
      let urlPath = path.join(__dirname, '../')
      if (url === '/') {
        urlPath += 'index.html';
      } else {
        urlPath += url.slice(1);
      }
      fs.readFile(urlPath, (err, data) => {
        if (err) {
          console.error('ERROR', err);
          return;
        }
        res.statusCode = 200;
        res.end(data.toString());
      })
    }
  } else {
    res.end('hello world');
  }



}
