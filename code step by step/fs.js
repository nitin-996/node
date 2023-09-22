const fs = require("fs");

// this takes input from CLI
const input = process.argv;

if (input[2] == "add") {
  fs.writeFileSync(input[3], input[4]);
} 
else if (input[2] == "remove")
 {
  fs.unlinkSync(input[3]);
}

// if in terminal i type
// node fs.js add new.txt 'this is new file'  
// it will create new file