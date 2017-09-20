const http = require('http');
const requestHandler = require('./request-handler');
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));

const server = http.createServer(requestHandler.requestHandler);
const port = 3000;
const ip = '127.0.0.1';
console.log(`listening on http://${ip}:${port}`);
server.listen(port, ip);

// const movies = [
//   {title: 'Mean Girls'},
//   {title: 'Hackers'},
//   {title: 'The Grey'},
//   {title: 'Sunshine'},
//   {title: 'Ex Machina'},
// ];
//
// fs.writeFileAsync('./movieData/data.js', JSON.stringify(movies))
//   .then(() => {
//     console.log('done');
//   })
//   .catch((err) => {
//     console.error(err);
//   })
