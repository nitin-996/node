const {MongoClient} = require('mongodb')
const url = 'mongodb://localhost:27017'

const connection = new MongoClient(url)

let del = async()=>{
    let connect = await connection.connect()
    let db = connect.db('e-comm')
    let collection =  db.collection('products')
    return collection;
}


async function main(){

    let impo = await del()
    let remo = await impo.deleteMany({
        name : 'motorola'
    })

    console.log(remo);

}

main()