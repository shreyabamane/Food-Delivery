import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


//placing user order for client
const placeOrder = async (req, res) => {

    //client url
    const client_url = "http://localhost:5174";

    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save(); //save the order in data base
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}}); // clear the cart data

        //create payment link using stripe
        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100 //  unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        // delivery charges
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount: 20*100 // unit_amount: 20*100*80
            },
            quantity:1
        })

        //create session using line_items
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${client_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${client_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}


//verify order payment
const verifyOrder = async (req,res) => {
    const {orderId,success} = req.body;
    try {
        if (success==="true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true, message:"Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Not Paid"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}


// user orders for client
const userOrders = async (req, res) => {
    try {
        //all orders of user
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}
 
// Listing orders for admin panel (find all the orders of all the users)
const listOrders = async (req,res) => {
    try {
       const orders = await orderModel.find({});
       res.json({success:true, data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

//api for updating order status
const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true, message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export {placeOrder, verifyOrder, userOrders, listOrders, updateStatus};
