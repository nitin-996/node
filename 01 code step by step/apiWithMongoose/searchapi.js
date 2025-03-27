const {model}= require('./db_structure')

const express = require('express')
const app = express()

app.use(express.json())

app.get('/search/:key', async (req,resp)=>{
   let db = await model.find({
       "$or": [
            {
                name:req.params.key
               
            },                         // array of object
            {
                price:req.params.key
            }
        ]
    })
    resp.send(db)
})

app.listen(3009)