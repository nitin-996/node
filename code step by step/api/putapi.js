const express = require('express');
const dbconnect = require('./dbconnection'); // Make sure the path to dbconnection is correct.
const app = express();
const route = express.Router();

app.use(express.json());

// using params to get dynamic request

route.put('/:name', async (req, resp) => {
  try {
    const db = await dbconnect();
    const result = await db.updateOne( {name: req.params.name} ,
     { $set: req.body });
    resp.send({result:"completed"});
    console.log(req.params.name);
  } catch (error) {
    resp.status(500).send(error); // Handle errors properly
  }
});

app.use('/', route); // Use the route with the express app

app.listen(9002, () => {
  console.log('Server is running on port 9002');
});
