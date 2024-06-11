import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


import path from 'path';
import { fileURLToPath } from "url";

// Resolving dirname for ES module
const _filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(_filename)
console.log(__dirname);


//app config
const app = express()
const port =  process.env.PORT || 8000


//middleware
app.use(express.json())
app.use(cors())


//db connection
connectDB();


// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


//use the client app 
app.use(express.static(path.join(__dirname, "../client/dist")))

//use the admin app 
app.use(express.static(path.join(__dirname, "../admin/dist")))

//Render client for any path
app.get('*', (req, res) => res.sendFile(path.join(__dirname, "../client/dist/index.html")))


//Render admin for any path
app.get('*', (req, res) => res.sendFile(path.join(__dirname, "../admin/dist/index.html")))


app.get("/",(req,res)=>{
    res.send("API Working")
})


app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`);
})


