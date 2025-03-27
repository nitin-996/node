const fs = require("fs");
let filename = "../todo.json";

const command = process.argv[2];
const argument = process.argv[3];


function load(){

    try {
        const databuffer = fs.readFileSync(filename)
        const dataJson = databuffer.toString()
        const data = JSON.parse(dataJson)
        // console.log(data);
        
        return data
    } catch (error) {
        return []
    }

}
function save(tasks){
    try {
        // console.log(tasks);
        
        const dataStr = JSON.stringify(tasks)
        fs.writeFileSync(filename,dataStr)
    } catch (error) {
        console.log(error);
        
    }
}
function list() {
   
    const data = load()
    
    if(data.length == 0){
        console.log("there is no data in file");
         }else{
            
            data.forEach((task, index) => 
                console.log(`${index + 1} - ${task.task}`));
         }

}
function add(task) {


    const tasks = load()
    // console.log(tasks);
    
    tasks.push({task})
    save(tasks)



}
function remove(index) {
    
    const data = load()
    const item = data.splice(index,1)
    save(item)
    
}


// console.log(items);  

if (command == "add") {
  add(argument);
  console.log("argument" , argument);
  
} else if (command == "remove") {
  remove(argument);
} else if (command == "list") {
  list();
} else {
  console.log("you have typed invalid command");
}
