const product = require('./db_structure');
const express = require('express');
const app = express();

// express.json() middleware automatically parses the JSON data into a JavaScript object,
// which you can then access using req.body in the route handler.
app.use(express.json());

app.post('/added', (req, resp) => {

    // new keyword is needed when we are inserting new object bcz,
    // new keyword create a instance then we put the value in it and sent to db.
    
    let data = new product.model(req.body); // Use `product.model` to create a new instance
    data.save()
        .then(result => {
            console.log(result); // Output the saved result
            resp.json({ message: 'Product saved successfully', product: result });
        })
        .catch(error => {
            console.error(error);
            resp.status(500).json({ error: 'An error occurred while saving the product' });
        });
});

app.listen(5000)