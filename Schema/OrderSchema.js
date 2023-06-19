import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
    orderBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    
    orderByName:{
        type:String,
        required:true
    },
    orderDate:{
        type:String,
        required:true
    },
    items:{
        type:Array,
        required:true
    },
    billAmount:{
        type:Number,
        required:true
    },
    billGenerated:{
        type:Boolean,
        default:false
    },
    month:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    
},{timestamps:true})

export default mongoose.model('Orders',OrderSchema)