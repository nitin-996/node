
const dbconnect = require('./dbconnection')

const express = require('express')
const app = express()


// getting data from mongodb
app.get('/', async (req,resp)=>{

    let mon = await dbconnect()
    let elab = await mon.find().toArray()
    resp.send(elab)

})


app.listen(6001 , ()=>{
    console.log('get api data fetch from mongo db');
})

