const express = require('express');
const EventEmitter = require('events');

const app = express();
const port = process.env.PORT || 3000;

// Create a custom event emitter class
// this is class and class should be pascal case
class MyEmitter extends EventEmitter {}

// Create an instance of the custom event emitter
const myEmitter = new MyEmitter();

// Define an API route that emits a custom event
app.get('/api/event', (req, res) => {
  // Emit the custom event when this route is accessed
  // The custom event "customEvent" is emitted with a data object
  // The data object contains a message describing the event

  // first parameter which emit the event same parameter is given to its handler (myEmitter.on) like we have given 
  // customEvent name as parameter in both places.
  myEmitter.emit('customEvent', { message: 'API endpoint was accessed!' });

  // Send a JSON response back to the client
  res.json({ message: 'API endpoint response' });
});

// Start the HTTP server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Event handler for the custom event
// This handler listens for the "customEvent" and logs the data when it's triggered
myEmitter.on('customEvent', (data) => {
  console.log('Custom event was triggered with data:', data);
});
