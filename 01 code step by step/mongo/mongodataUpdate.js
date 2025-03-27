const {MongoClient} = require('mongodb')
const url = 'mongodb://localhost:27017'

const connection = new MongoClient(url)

async function update(){
    let connect = await connection.connect()
    let db = connect.db('e-comm')
    let collection =  db.collection('products')
    return collection;
}


async function main(){
    let push = await update()
    let result2 = await push.updateMany(
        {name:'redmi'},
    {$set:
         {name:'motorola'}
    }

    )

    console.log(result2);
}

main()

