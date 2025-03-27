const express = require('express');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3000;


// used multer to upload files

// Set up the Multer storage engine and destination folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {      // here cb refered as call back
    cb(null, 'uploads/'); // Specify the folder where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    // Generate a unique file name for each uploaded file (you can customize this logic)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  },
});

// Initialize Multer with the storage options
const upload = multer({ storage });

// Set up a route to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  // req.file contains information about the uploaded file
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // You can access the file details like req.file.filename, req.file.size, etc.
  const fileDetails = {
    filename: req.file.filename,
    size: req.file.size,
    mimetype: req.file.mimetype,
  };

  res.status(200).json({ message: 'File uploaded successfully', file: fileDetails });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
