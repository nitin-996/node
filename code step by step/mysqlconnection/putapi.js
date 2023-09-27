const express = require('express')
const con = require('./dbconnectionModule')

const app = express()

app.use(express.json())

// This route handles the HTTP PUT request to update user data.

// statically update 
app.put('/', (req, resp) => {
  
    // Define the data to be updated for user with user_id 1.
    // In this example, we update the username to 'nitin', email to 'test@gmail.com', and user_id to 1.
    const data = ['nitin', 'test@gmail.com', 1];

    // Execute a SQL query to update the 'username' and 'email' fields of the user with 'user_id' equal to 1.
    con.pool.query('UPDATE users SET username = ?, email = ? WHERE user_id = ?', data, (err, result, fields) => {
        if (err) {
            // Handle errors by logging the error message and sending a 500 Internal Server Error response.
            console.error('Error updating user:', err);
            resp.status(500).json({ error: 'Failed to update user' });
        } else {
            // If the update is successful, log a success message and send a JSON response indicating success.
            console.log('User updated:', result);
            resp.json({ message: 'User updated successfully' });
        }
    });
});


// dynamically update data

app.put('/:user_id', (req, resp) => {
  
    // Define the data to be updated for user with user_id 1.
    // In this example, we update the username to 'nitin', email to 'test@gmail.com', and user_id to 1.
    const data = [req.body.username ,req.body.email , req.params.user_id];

    // Execute a SQL query to update the 'username' and 'email' fields of the user with 'user_id' equal to 1.
    con.pool.query('UPDATE users SET username = ?, email = ? WHERE user_id = ?', data, (err, result, fields) => {
        if (err) {
            // Handle errors by logging the error message and sending a 500 Internal Server Error response.
            console.error('Error updating user:', err);
            resp.status(500).json({ error: 'Failed to update user' });
        } else {
            // If the update is successful, log a success message and send a JSON response indicating success.
            console.log('User updated:', result);
            resp.json({ message: 'User updated successfully' });
        }
    });
});

app.listen(4009)