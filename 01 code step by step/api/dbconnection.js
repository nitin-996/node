// below is using object destructuring to extract the MongoClient class from the 'mongodb' module. 
// It is a common way to import specific parts of a module in JavaScript.

const {MongoClient} = require('mongodb')
const url = 'mongodb://localhost:27017'

const connection = new MongoClient(url)

async function update(){
    let connect = await connection.connect()
    let db = connect.db('e-comm')
    let collection =  db.collection('products')
    return collection;
}

module.exports = update

console.log();