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
      // fs.readFileAsync('./movieData/data.js')
      // .then((data) => {
      //   return data; //Keep this .then() in case any parsing is needed
      // })
      // .then((data) => {
      //   res.statusCode = 200;
      //   res.end(data);
      // })
      // .catch((err) => {
      //   res.statusCode = 400;
      //   res.end(err.toString());
      // });
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
        console.log('body is', body);
        const parsedBody = JSON.parse(body);
        // console.log('error code is', parsedBody.errorCode);
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
        // fs.readFileAsync('./movieData/data.js')
        // .then((data) => {
        //   return JSON.parse(data);
        // })
        // .then((data) => {
        //   console.log('data is', data);
        //   data.push(JSON.parse(body));
        //   return fs.writeFileAsync('./movieData/data.js', JSON.stringify(data));
        // })
        // .then(() => {
        //   res.statusCode = 200;
        //   res.end(body);
        // });
      });
    });

  } else {
    res.end('hello world');
  }
}
