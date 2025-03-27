const mongoose = require('mongoose')

const dbconnect = mongoose.connect('mongodb://localhost:27017/e-comm')
.then(()=>{console.log("connection ok");})
.catch(()=>{
    console.log("rejected");
})



// url parameter = ('mongodb:localhost:Portno/DbName')

let schema = new mongoose.Schema({
    name:String,
    model:String,
    price:Number,
    category:String
})
let model = mongoose.model('products' , schema)

module.exports = {
    model,
    dbconnect,
    mongoose
} 

