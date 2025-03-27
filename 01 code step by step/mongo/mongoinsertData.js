const {MongoClient} = require('mongodb')

const url = 'mongodb://localhost:27017'

const connection = new MongoClient(url)

async function insert(){

    let attach = await connection.connect()
    let db = attach.db('e-comm')
    let collection = db.collection('products')
    let put = await collection.insertOne({
        name: "xiomi",
        model: 'mi 14',
        price: 15000

    })

    if(put.acknowledged){
        console.log("data has been inserted successfully");
    }
}  

insert()