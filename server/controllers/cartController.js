//create api's using that we can update the data in the users cart

import userModel from "../models/userModel.js";


// add items to user cart
const addToCart = async (req, res) => {
    try {
        // find user data
        let userData = await userModel.findOne({ _id: req.body.userId })// userId get from the middleware
        // extract cart data
        let cartData = await userData.cartData;

        //modify data, when user had add to data in the cart then they will send the token & with that they will send the item id
        if (!cartData[req.body.itemId])
        {
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        //upadate the cart data
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        //generate response
        res.json({success:true, message:"Added To Cart"});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}


// remove items from user cart
const removeFromCart = async (req, res) => { }


// fetch user cart data
const getCart = async (req, res) => { }


export { addToCart, removeFromCart, getCart };