const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'files');

// Read the list of files in the directory
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // Loop through the files
    files.forEach((file) => {
        const filePath = path.join(directoryPath, file);

        // Read the content of each file
        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                console.error(`Error reading file ${file}:`, err);
            } else {
                console.log(`Content of ${file}:`);
                console.log(content);
            }
        });
    });
});