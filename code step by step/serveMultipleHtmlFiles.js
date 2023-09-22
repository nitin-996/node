const express = require('express');
const path = require('path');

const app = express();
const port = 3000; // Choose the port you want to use

// Define the directory for your static files (e.g., HTML, CSS, JavaScript)
const publicDirectoryPath = path.join(__dirname, 'public');

// Use the express.static middleware to serve static files from the "public" folder
app.use(express.static(publicDirectoryPath));

// Start the server
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});