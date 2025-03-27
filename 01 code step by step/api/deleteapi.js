const express = require('express')
const app = express()
const dbconnect = require('./dbconnection')
const route = express.Router()

const mongo = require('mongodb')

app.use(express.json())

route.delete('/:id', async(req,resp)=>{
    let db = await dbconnect()

    // we create new instance which borrow the power of mongo so we can use its ObjectId method to delete collection using ID
let result = await db.deleteOne({_id: new mongo.ObjectId(req.params.id)})
console.log(req.params);
resp.send(result)
})

app.use('/', route)

app.listen(3004)
