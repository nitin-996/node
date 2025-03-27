const mongoose = require('mongoose')

const db_connect = async()=>{
    try{await mongoose.connect('mongodb://localhost:27017/e-comm')}
    catch(err){
        console.log(err);
    }

}

db_connect()

// creating schema

const schema= new mongoose.Schema({
    name:String,
    model:String,
    Price:Number

})

//creating model

const model = mongoose.model('products', schema)

// created function to find data

const get = async()=>{
   let result = await model.find()
   console.log(result);
}

get()