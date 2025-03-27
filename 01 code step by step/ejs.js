const express = require('express');
const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Define routes and middleware
// ...

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/profile', (req, res) => {
    
    const user = {
        name: "nitin",
        rollno: 26,
        city: "delhi"
    }
    
    
    res.render('profile', {user} );
});
