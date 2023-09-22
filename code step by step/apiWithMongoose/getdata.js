const {model}= require('./db_structure')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.json())

app.get('/',  async(req,resp)=>{
    let db = await model.find() // bcz we are only getting the data so no need to create instance using new key word.
    let result = db
    resp.send(result)
    console.log(result);
 })


 app.listen(4001)

