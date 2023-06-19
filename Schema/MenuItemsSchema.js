import mongoose from "mongoose";

const MenuItemsSchema = mongoose.Schema({
    category_name:{
        type:String,
        required:true
    },
    item_name:{
        type:String,
        required:true
    },
    item_price:{
        type:Number,
        required:true
    },
    item_image:{
        type:String
    }
},{timestamps:true})

export default mongoose.model('MenuItems',MenuItemsSchema)