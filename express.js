const express = require("express");
const app = express();



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

// api to get 
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if (!course) res.status(404).send('the course with given id was not found')
  res.send(course)
});

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`listing on port ${port}`));
