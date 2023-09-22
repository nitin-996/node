const express = require('express')
const app = express()
const rack = require("./express")
const route =express.Router()

route.use(rack)



// route middleware is only applied to specific route
route.get('/minddle', (req,resp)=>{
    resp.send("this is route middleware")
})

app.use('/' , route)  // using this middleware only apllied on route.



