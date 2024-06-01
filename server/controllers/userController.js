// user can login or signup

import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"; // create authentication
import bcrypt from "bcrypt";
import validator from "validator";


//login user
const loginUser = async (req, res) => {
    const {email,password} = req.body;
    try {
        //if any account is available then the user account will stored in this user variable
        const user = await userModel.findOne({email})

        //check wheather the user is available or not
        if (!user) {
            return res.json({success:false, message:"User doesn't exist"})
        }
         
       // we are getting the user in that case we will matched the user password with the stored password in the database
       const isMatch = await bcrypt.compare(password,user.password);

       //password is not matching
       if (!isMatch) {
        return res.json({success:false, message:"Invalid credentials"})
       }

       //password is matching generate token
       const token = createToken(user._id);
       res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}


//register user
const registerUser = async (req, res) => {
    //destructure that name, email, password from the request body
    const {name,password,email} = req.body;
    try {
        // checking is user already exists
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success:false, message: "User already exists"})
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message: "Please enter valid email"})
        }

        if (password.length<8) {
           return res.json({success:false, message: "Please enter a strong password"}) 
        }

        // encrypt password (hashing user password)
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        //create new user by using name , password & email
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        // saved user in the database
        const user = await newUser.save()

        // create token, send that token using the response to user
        const token = createToken(user._id)

        //send token as response
        res.json({success:true,token});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}


export {loginUser, registerUser};