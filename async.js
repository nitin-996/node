 getuser(1,(user)=> {
    console.log(user)
 })

 function getuser(id ,callback){

    setTimeout(()=>{
        console.log("reading from db");
        callback({id: id , github: "mosh"})
    },3000)

 }

function nitin() {
    console.log("hardik");
}

// const nitin = function () {
//     console.log("nitin");
// }

nitin();