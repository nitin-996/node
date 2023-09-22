const mongoose = require('mongoose')

const main = async()=>{
await mongoose.connect("mongodb://localhost:27017/e-comm")


// we use schema bcz it provide security, what object we mention in schema apart from those properties we can't enter another property.
// example like i have define three property (name,price,model) if i try to add (year) propery then it will not be saved in database.

const ProductSchema = new mongoose.Schema({
    name : String,
    price: Number,
    model: String
})

// const ProductSchema = mongoose.model('tablename',schemaname)
// model used to connect nodejs and mongodb
const ProductsModel = mongoose.model('products',ProductSchema);

// create new instance means using schema we can push the data as it is new entry.
let data = new ProductsModel({name:"m8",
model: "iphone 11",
price: 30000,

})
//  to save data in mongodb using mongoose.
let result = await data.save();
console.log(result);

}




main()

