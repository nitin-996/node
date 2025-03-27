let a= 10;
let b = 20;




let waiting = new Promise((resolve,reject)=>{
    setTimeout(() => {
        let b = 30;
        resolve(b)
        
    }, 2000);
}).then((b)=>{console.log(a+b)})
// console.log((a+b));