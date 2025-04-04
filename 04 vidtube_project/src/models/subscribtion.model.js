import mongoose, {Schema} from "mongoose";

const subscriptionSchema = new Schema({
   
    subscriber:{
        type:Schema.Types.ObjectId, // tells how many channels you (as a user) have subscribed to.
        ref: "User"
    },
    channel:{
        type:Schema.Types.ObjectId, //tells how many people have subscribed to your channel.
        ref: "User"
    }
},
{timestamps:true})

export const Subscription = mongoose.model("Subscription", subscriptionSchema)