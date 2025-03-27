const {MongoClient} = require('mongodb')
const url = 'mongodb://localhost:27017'

let connection = new MongoClient(url)

async function data(){
    
        let client = await connection.connect()  // return promise
        let db = client.db('e-comm')
        return db.collection('products')
       
}

// data().then((resp)=>{
//     resp.find().toArray().then((query)=>{
//         console.log(query);
//     })
//     })

    // second approach to get data

    let main = async ()=>
    {

        let data2 = await data()
        let result = await data2.find({}).toArray()
        console.warn(result)
    }

    main()