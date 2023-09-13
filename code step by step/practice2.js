const http = require('http')

let server = http.createServer((req , resp)=>{
    resp.write("hello this is NS")
    resp.end()
})

server.listen(3000 , () => {
    console.log('this is new server');
}) 