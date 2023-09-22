const mongoose = require('mongoose');

// Define a function to connect to the database
const dbconnect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/e-comm');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Connection to MongoDB failed:', error);
  }
};

// Define a schema for the Product collection
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  model: String,
});

// Create a model for the Product collection
const Product = mongoose.model('Product', ProductSchema);

// Define a function to update records in the database
const updateInDb = async () => {
  try {

    // here in mongoose it does not show that it returns promises wven when i hover over it , it does not show promise but keep in mind
    // that this also use mongodb driver and it returns promises even if it not shown over hovering on it.
    
    const result = await Product.updateMany(
      { name: 'm8' }, 
      { $set: { name: 'motorola' } });
    console.log('Update successful:', result);
  } catch (error) {
    console.error('Update error:', error);
  }
};

// Call the functions to connect to the database and perform the update
const main = async () => {
  await dbconnect(); // Establish the database connection
  await updateInDb(); // Perform the update operation
  mongoose.disconnect(); // Close the database connection when done
};

main();
