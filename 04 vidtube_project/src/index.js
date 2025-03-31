import dotenv from "dotenv";
import { app } from "./app.js"; 
import {DB_connect} from "./db/index.js"

dotenv.config({ path: "./src/.env" });



const PORT = process.env.PORT || 3003;

DB_connect()
    .then(() => { 
        app.listen(PORT, () => {
            console.log(`Server is listening on ${PORT}`);
        });
    })
    .catch((e) => {
        console.error("Database connection failed:", e);
    });



