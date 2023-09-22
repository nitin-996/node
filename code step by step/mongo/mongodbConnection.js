const { MongoClient } = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;

// upper one and below one both do the same work, its just upper one is new way to import the mongdb.

const url = 'mongodb://localhost:27017'

const client= new MongoClient(url);

async function getData() {
    try {
        await client.connect();
        const db = client.db('e-comm');
        const collection = db.collection('products');
        const response = await collection.find({}).toArray();
        console.log(response);
    } catch (error) {
        console.error('Error:', error);
    }
}

getData();


/*
Certainly! Here's an explanation of each line in your code:

1. `const { MongoClient } = require('mongodb');`
   - This line imports the `MongoClient` class from the 'mongodb' library using destructuring. It allows you to use `MongoClient` directly in your code.

2. `const url = 'mongodb://localhost:27017';`
   - This line defines a variable `url` that contains the connection URL for your MongoDB server. It specifies the server's location (localhost) and port (27017).

3. `const client = new MongoClient(url);`
   - This line creates a new instance of the `MongoClient` class, initializing it with the connection URL defined earlier. This `client` object will be used to interact with the MongoDB server.

4. `async function getData() {`
   - This line defines an asynchronous function called `getData`. The `async` keyword indicates that this function contains asynchronous operations that may involve waiting for things like network requests.

5. `try {`
   - This marks the beginning of a try block, which is used to encapsulate code that may potentially throw an error. If an error occurs within this block, it can be caught and handled in the `catch` block.

6. `await client.connect();`
   - This line connects to the MongoDB server using the `await` keyword, which means it will wait for the connection to be established before proceeding further. It's an asynchronous operation that returns a promise.

7. `const db = client.db('e-comm');`
   - After successfully connecting, this line selects a specific database named 'e-comm' from the MongoDB server and assigns it to the `db` variable.

8. `const collection = db.collection('products');`
   - It selects a specific collection named 'products' within the 'e-comm' database and assigns it to the `collection` variable. This is the collection from which data will be fetched.

9. `const response = await collection.find({}).toArray();`
   - This line fetches all documents (data) from the 'products' collection using the `find({})` method, and then converts the result into an array using `toArray()`. It uses `await` to wait for the operation to complete.

10. `console.log(response);`
    - It prints the retrieved data (stored in the `response` variable) to the console.

11. `} catch (error) {`
    - This marks the beginning of a catch block, which is executed if an error occurs within the try block. It catches and handles any errors that might occur during the database operation.

12. `console.error('Error:', error);`
    - If an error occurs, this line logs an error message along with the specific error object to the console.

13. `} finally {`
    - The `finally` block is executed regardless of whether an error occurred or not. It's used here to ensure that the MongoDB client connection is properly closed to release resources.

14. `await client.close();`
    - This line closes the MongoDB client connection gracefully. It uses `await` to wait for the connection to be closed before completing the function.

15. `}`
    - This marks the end of the `try...catch...finally` block.

16. `getData();`
    - Finally, this line calls the `getData` function to initiate the database operation.

In summary, this code sets up a MongoDB connection, fetches data from a specific collection, handles errors, and ensures that the connection is closed when the operation is complete. */