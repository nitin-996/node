import mongoose from "mongoose"

const { Schema } = mongoose;


const userSchema = new Schema({
    username:{
        type: String,
        required:true,
        unique:true,
        lowercase: true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName: {
        type:String,
        require:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,
        required:true
    },
    coverimage:{
        type:String,
    },
    watchhistory:[
        {
            type:Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password:{
        type:String,
        required: [true, "password is required"]
    },
    refreshToken:{
        type:String,
    }

},
{timestamps:true}
)

const User = mongoose.model("User" , userSchema)

export {User}