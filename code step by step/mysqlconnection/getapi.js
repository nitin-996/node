const express = require('express')
const con = require('./dbconnectionModule')
const app = express()


app.get('/',(req,resp)=>{

    // here in query parameter after quary it takes two parameter err and result.

    con.pool.query("select * from users",(err,result)=>{
        if (err){
            console.log(err);
        }else{
            console.log(result);
        }

    })
})

app.listen(3000)