const http = require('http');

// Create a server and provide a callback function to handle requests

const server = http.createServer((request, response) => {

    // This is the callback function that gets executed when a request is made

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello, this is the response from the server!');
});

// Start the server and listen on port 3000

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
