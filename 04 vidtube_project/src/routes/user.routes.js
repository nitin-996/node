import { Router } from "express";
import {upload} from "../middlewares/multer.middlewares.js"
import { changeCurrentPassword, getCurrentUser, getUserChannelProfile, getWatchHistory, refreshAccessToken, updateAccountDetails, updateUserAvatar, updateUserCoverImage, userLogin, userLogout, userRegister } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


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

router.post("/login", userLogin)


router.post("/logout", verifyJWT, userLogout)
router.post("/refresh-token" , refreshAccessToken)
router.post("/change-password", verifyJWT,changeCurrentPassword)
router.get("/current-user" , verifyJWT , getCurrentUser)
router.patch("update-account" , verifyJWT,updateAccountDetails)

router.patch("/avatar" , verifyJWT , upload.single("avatar") , updateUserAvatar)
router.patch("/cover-image" , verifyJWT , upload.single("coverImage"), updateUserCoverImage)

router.route("/channel/:username").get(verifyJWT,getUserChannelProfile)
router.get("/history" , verifyJWT , getWatchHistory)



export default router 