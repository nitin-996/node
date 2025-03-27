const express = require('express')
const app = express()


// to listen the route

app.listen(3000, ()=>{
    console.log('listen on 3000');
})

// to get the request

app.get('/',(req,resp)=>{

    resp.send("this is express")

})

app.get('/about',(req,resp)=>{
resp.send("deleted")

})






