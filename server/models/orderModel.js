// save order in database

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    //define the structure
    userId:{type:String,required:true},
    items:{type:Array, required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"Food Processing"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false}
})

const orderModel = mongoose.models.order || mongoose.model("order",orderSchema);
export default orderModel;