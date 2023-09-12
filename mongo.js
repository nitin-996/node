const { string } = require('joi')
const mongoose = require('mongoose')


// connection to mongodb

mongoose.connect('mongodb://localhost/playground')
.then(() => console.log("connected db"))
.catch(err => console.error('couldn\'t connect to db' , err))

// creating schema

const courseSchema = new mongoose.Schema({
    name: String,
    author : String,
    tags: String,
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('course' , courseSchema);



// create a collection
async function createCourse(){
    const course = new Course({
        name: 'Node.ja course',
        author: 'Mosh',
        tags: ['node', 'backend'],
        isPublished: true
    })
    
    const result = await course.save();
    console.log(result);
}

createCourse()

// getcollection using find method of mongo
async function getCourse(){
    const courses = await Course
    // .find({author:'mosh', ispubished:true})

//  here we use comparision operator
// it gives list of collection where price value is greater than 10
    .find({price: {$gt : 10}})
    .limit(10)
    .sort({name: 1})
    .select({name:1, tags:1});
console.log(courses);
}

getCourse()








