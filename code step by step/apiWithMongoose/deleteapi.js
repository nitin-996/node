const{model} = require('./db_structure')
const express = require('express')
const app = express()


app.use(express.json())


app.delete('/:_id',async(req,resp)=>{
    let db = await model.deleteOne(req.params)
    resp.send(db )
}

)

app.listen(6001)