const mysql =require('mysql')
const pool = mysql.createPool(
    {
        host:'localhost',
        user:'root',
        password:"Cliffex@123",
        database:"test"

    }
);

// Example SQL query
const sqlQuery = 'SELECT * FROM your_table_name';



// Use the connection pool to query the database



module.exports = 
{
    pool,
    
}




