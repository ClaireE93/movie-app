const request = require('request');
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const path = require('path');
const netflix = require('../src/netflixHelper');
const redis = require('redis');
const redisClient = redis.createClient({host : 'localhost', port : 6379});

redisClient.on('ready',function() {
 console.log("Redis is ready");
});

redisClient.on('error',function() {
 console.log("Error in Redis");
});

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
      redisClient.hgetall('Movies', (err, objects) => {
        const arr = [];
        for(let key in objects) {
          arr.push(JSON.parse(objects[key]));
        }
        res.statusCode = 200;
        res.end(JSON.stringify(arr));
      });
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
      console.log('title is', title);
      const reqUrl = `http://netflixroulette.net/api/api.php?title=${title}`;
      request(reqUrl, function (error, response, body) {
        const parsedBody = JSON.parse(body);
        if (parsedBody.errorCode === 404) {
          res.statusCode = 404;
          res.end('Bad movie')
        } else {
          const title = parsedBody.show_title;
          redisClient.hset('Movies', title, body, () => {
            res.statusCode = 200;
            res.end(body);
          });
        }
      });
    });

  } else {
    res.end('hello world');
  }
}
