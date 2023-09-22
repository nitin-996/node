const http = require('http');
const data = require('./api2');


const server = http.createServer((req , resp) => {
    resp.writeHead(200 , {'content-type':'application/json'})
    resp.write(JSON.stringify(data));
    resp.end()
})

server.listen(4000)