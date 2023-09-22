const express = require('express')
const app = express()

app.listen(5000,()=>{
    console.log("listen on 5000");
})



// this is the middleware 
const rack = (req,resp,next)=>{
    if(!req.query.age){
        resp.send("please provide age")
    }
    else{
        next()
    }
}

//  using middleware
app.use(rack)


app.get('/', (req,resp)=>{
    resp.send("this is middleware practice")
})

app.get('/about', (req,resp)=>{
    resp.send("this is about")
})

module.exports = rack