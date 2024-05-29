import express from "express";
import cors from "cors";


//app config
const app = express()
const port = 8000


//middleware
app.use(express.json())
app.use(cors())


app.get("/",(req,res)=>{
    res.send("API Working")
})


app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`);
})


//mongodb+srv://Shreya:Shreya8263@cluster0.auckslp.mongodb.net/?