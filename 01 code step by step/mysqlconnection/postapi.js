const express = require('express')
const con = require('./dbconnectionModule')
const app = express()

app.use(express.json())

app.post('/', (req,resp)=>{

    const data =  req.body()

    // for post query it takes three parameter and at last parameter it takes call back in which three  parameter has mentioned.
    // first is error then result and at last fields.
    con.pool.query('INsert into users SET ?', data ,(error,result,fields)=>{
if (error) error
else{console.log(result);}
    })

})

app.listen(6000)