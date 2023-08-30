const Joi = require("joi"); // it is used for validation
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

// get api

//  app.get("/api/courses/:id", (req, res) => {
//   const course = courses.find(c => c.id === parseInt(req.params.id))
//   if (!course) res.status(404).send('the course with given id was not found')
//   res.send(course)
// });

// this post api will increase id and add new name of course in courses object array.
app.post("/api/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

// input validation (rest api folder video no 11)
app.post("/api/courses", (req, res) => {
  
  const {error} = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
 
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

// put api (its used to update)

app.put("/api/courses/:id/", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("the course with given id was not found");
// its single statement so we did

// here we used object destructor for error.

  const {error} = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  course.name = req.body.name;
  res.send(course);
});

// validation method (which has been used in put and post api for validation)

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validation(req.body, schema);
}

app.delete('./api/course/:id' ,(req,res)=>{
  
  // checking if object exit or not
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("the course with given id was not found");

  // deleting
  const index = courses.indexOf(course);
  courses.splice(index , 1)



})

// used express to run server on mentioned port.
const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`listing on port ${port}`));
