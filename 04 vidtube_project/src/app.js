import express from "express"
import cors from "cors"

const app = express()
var corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credential: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


//   common middlewares
  app.use(cors(corsOptions))
  app.use(express.json({limit:"16kb"}))
  app.use(express.static("public"))
  app.use(express.urlencoded({extended:true,limit:"16kb"}))


// Routes
import healthcheckRouter from "./routes/healthcheck.routes.js"


app.use("/api/v1/healthcheck", healthcheckRouter)



export {
    app
}