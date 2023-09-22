const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
  host: 'your_database_host',
  user: 'your_database_user',
  password: 'your_database_password',
  database: 'your_database_name',
});

// Example SQL query
const sqlQuery = 'SELECT * FROM your_table_name';

// Use the connection pool to query the database
pool.query(sqlQuery, (error, results) => {
  if (error) {
    console.error('Error executing SQL query:', error);
    return;
  }

  // Process the query results here
  console.log('Query results:', results);
});

// Close the connection pool when your application is finished
pool.end((err) => {
    if (err) {
      console.error('Error closing the connection pool:', err);
    } else {
      console.log('Connection pool has been closed.');
    }
  });
  