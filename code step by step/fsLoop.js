const fs = require('fs')
const path = require("path")
const destination = path.join(__dirname,'files')




for(i=0;i<5;i++){
    // fs.writeFileSync(`${destination}/new${1}.txt`, " this is secong file created using fs module")
fs.writeFileSync(destination+"/hello"+i+".txt", " this is new")
}

fs.readdir(destination,(err, items)=>{

    console.log(items);  // this directly give array
    // items.forEach((items)=>{  // this iterates over files so it give file name one by one.
    //     console.log(items)
    // })
})



fs.readFile(`${destination}`,'utf8',(err, mon)=>{


    if (err) {
        console.error(err);
        return;
    }
    console.log(mon)
})

