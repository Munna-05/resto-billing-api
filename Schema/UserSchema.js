import mongoose from "mongoose";

const UserSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    
    
   
},{timestamps:true})

export default mongoose.model('Users',UserSchema)