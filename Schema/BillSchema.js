import mongoose from "mongoose";

const BillSchema = mongoose.Schema({
    OrderDetails:{type:mongoose.Schema.Types.ObjectId, ref:'Orders'},
    OrderBy:{type:mongoose.Schema.Types.ObjectId,ref:"Users"}
},{timestamps:true})

export default mongoose.model("Bills",BillSchema)