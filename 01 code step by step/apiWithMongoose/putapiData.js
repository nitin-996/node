const {model} = require('./db_structure') // used destructor object to get model from db_structure file
const express= require('express')
const app =express()

app.use(express.json())

app.put('/:_id',async(req , resp)=>{
    let db = await model.updateOne(req.params,
      
        {$set: req.body } // this is already a object that's why we didn't use the curly braces
        
    )
    let result = db
    resp.send(result)
})

app.listen(4002)