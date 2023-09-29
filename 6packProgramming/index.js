import express from "express"
let app = express()
import path from 'path'
const dir = path.join(path.resolve(),'public')
app.use(express.static(dir))

// setup ejs
app.set('view engine' , 'ejs' )

// to use ejs ues render method.
app.get('/',(req,resp)=>{
    resp.render('index' 
        

    )
})

app.listen(5000)