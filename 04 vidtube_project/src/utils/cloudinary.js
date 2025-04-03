import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import dotenv from 'dotenv';
dotenv.config({path: "./src/.env"})

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.cloudinary_cloud_name, 
        api_key: process.env.cloudinary_api_key, 
        api_secret: process.env.cloudinary_api_secret
    });
    
    // when multer stores the files on local system,
    // it return that filename path,
    // that same path we are using here , means passing 
    // that local path as parameter.
   const uploadToCloudinary = async (localFilePath)=>{

    try {
        console.log("avatar file local path:", localFilePath);
        
        if(!localFilePath) return null
     const response =   await cloudinary.uploader.upload(localFilePath, {
            resource_type:'auto'
        })

        console.log("file uploaded on cloudinary. file src: "+ response.url);

        // after uploading delete local system file.
        fs.unlinkSync(localFilePath)

        return response
        
    } catch (error) {

        // agar koi error h, then delete file
        fs.unlinkSync(localFilePath)
        console.log("error in Cloudinary file" , error);
        return null;
        
    }
   }


   
   export {uploadToCloudinary}