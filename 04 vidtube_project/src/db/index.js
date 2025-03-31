import mongoose from "mongoose"
import {DB_NAME} from "../constants.js"

const DB_connect = async () => {
    
    try {
        const connectInstance = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}` )

        console.log(`Mongo host URL: ${connectInstance.connection.host}`);
        
    } catch (error) {
        console.log("mongo db connect error",error);
               
        process.exit(1);
    }
}

export {DB_connect}