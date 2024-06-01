//Model of user

import mongoose from "mongoose";

// schema for user
const userSchema = new mongoose.Schema({
    // add properties that will be in models
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    //manage users cart
    cartData:{type:Object, default:{}}
},{minimize:false}) //if we don't add this false in that case cart data will not created because we have not provided data here.

const userModel = mongoose.models.user || mongoose.model("user",userSchema);

export default userModel;