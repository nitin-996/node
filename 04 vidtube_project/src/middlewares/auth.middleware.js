import jwt from "jsonwebtoken"
import { Users } from "../models/user.models"
import { asyncHandler } from "../utils/asyncHandler"
import { ApiError } from "../utils/ApiError"


/*
How this middleware getting token below is the explaination.

When a user clicks the "Logout" button, the frontend sends 
a request to the logout API,including the Authorization header
(if required). Then:

1️⃣ The middleware first processes the request (e.g., verifies the token).
2️⃣ The controller clears the refreshToken from the database and removes the cookies.
3️⃣ The frontend removes the accessToken from local storage or memory. */

export const verifyJWT = asyncHandler( async (req,res,next)=>{

    const token = req.cookies.accessToken || req.header
    ("Authorization")?.replace("Bearer ", "")

    if(!token){
        throw new ApiError(401, "Unauthorized")
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("after jwt verification it decode the object and stores it in decord variable");
        
        const user = await Users.findById(decoded?._id).select("-passeord -refreshToken")
        
        if(!user){
            throw new ApiError(401, "Unauthorized")
        }
        req.user = user // Injecting user data into req
        next();  // this next calls for middleware if any is defined in router otherwise calls controller.

        // flow    routes("/logout", -> verifyJwt , -> userLogout)
      } catch (err) {
        
        throw new ApiError(401, err?.message || "Invalide access token")

      }
    


    
})