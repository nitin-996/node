import { Router } from "express";
import {upload} from "../middlewares/multer.middlewares.js"
import { userRegister } from "../controllers/user.controller.js";


const router = Router()


// first uploads the files on local system,
// then control goes to controller.
// multer upload.fields() Accept a mix of files, specified by fields. 
// An object with arrays of files will be stored in req.files.
router.route("/registration").post(upload.fields([
    {name: "avatar",
     maxCount:1
    },{
        name:"coverImage",
        maxCount:1
    }
]), userRegister)




export default router 