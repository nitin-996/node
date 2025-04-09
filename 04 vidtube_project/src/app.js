import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
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
  app.use(cookieParser())
  app.use(errorHandler)

// Routes
import healthcheckRouter from "./routes/healthcheck.routes.js"
import { errorHandler } from "./middlewares/error.middleware.js"
import userRouter from "./routes/user.routes.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/playlist", playlistRouter)
app.use("/api/v1/dashboard", dashboardRouter)



export {
    app
}