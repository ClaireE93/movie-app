const http = require('http');
const requestHandler = require('./request-handler');

const server = http.createServer(requestHandler.requestHandler);
const port = 3000;
const ip = '127.0.0.1';
console.log(`listening on http://${ip}:${port}`);
server.listen(port, ip);
