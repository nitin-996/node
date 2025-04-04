import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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


// using mongoDB middleware which will help to encrypt password securely
// also here we are using normal function bcz we need to reference of userschema
// on which we are applying pre middleware from mongo. it is not from express.
userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        return next();
    }

    this.password = await bcrypt.hash(this.password,10);
})



// using schema methods function , here we are defining own 
// custom methods.
userSchema.methods.ispasswordCorrect = async function(password){

    // this compare functions returns true or false
    const result = bcrypt.compare(password, this.password)
    return result
}


// access token (used at login time)
userSchema.methods.generateAccessToken =  async function(){

    var token = jwt.sign(
        {
            _id : this._id,
            username: this.username,
            email: this.email
             },
         process.env.Access_Token_Secret,
        {expiresIn: "1h"});

    return token    

}

// refresh token (after login for session management)
userSchema.methods.generateRefreshToken =  async function(){

    var token = jwt.sign(
        {
            _id : this._id,
             },
         process.env.Refresh_Token_Secret,
        {expiresIn: "10d"});

    return token    

}


const Users = mongoose.model("Users" , userSchema)

export {Users}