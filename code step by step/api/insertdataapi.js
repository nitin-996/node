const dbconnect = require('./dbconnection')
const express = require('express')
const app = express()
const route = express.Router()


app.use(express.json())

app.post('/', async(req,resp)=>{
      
   
    let data = await dbconnect()

    // took the object in json form from postman into req.body then 
    // insert it into the database.
    let result = await data.insertOne((req.body))
    resp.send((result))
})

app.listen(8000)