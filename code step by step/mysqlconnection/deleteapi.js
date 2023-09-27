const express = require('express');
const con = require('./dbconnectionModule');
const app = express();

app.use(express.json());

app.delete('/:user_id', (req, resp) => {
    

    con.pool.query('DELETE FROM users WHERE user_id ='+req.params.user_id ,(error, results) => {
        if (error) {
            console.error('Error deleting user:', error);
            resp.status(500).json({ error: 'Failed to delete user' });
        } else {
            console.log('User deleted:', results);
            resp.json({ message: 'User deleted successfully' });
        }
    });
});

app.listen(7000);
