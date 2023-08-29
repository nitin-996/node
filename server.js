const courses = [
    {id: 2, name: "a"},
    {id: 1,name: "b"},
  ];
  
  const cour =  courses.find(element => element.id == '2')
  const courOne =  courses.find(element => element.name == 'a')
  console.log(cour)
  console.log(courOne)