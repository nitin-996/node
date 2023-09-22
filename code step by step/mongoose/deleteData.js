const mongoose  = require('mongoose')
const dbconnect = async()=>{
   try {
    await mongoose.connect('mongodb://localhost:27017/e-comm')
    
   } catch (error) {

    console.log(error)
    
   } 
}

// invoke dbconnect function which is used to connect database
dbconnect()

let schema = new mongoose.Schema({
    name: String,
    price:Number,
    model: String
})

let model = mongoose.model('products', schema)

let del = async()=>{
    let result = await model.deleteOne({
        name:'xiomi'
    })

    console.log(result);
}

//  invoke delete function to delete the object from database.
del()