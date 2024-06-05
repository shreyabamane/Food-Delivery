import mongoose from "mongoose";


export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_CONNECTION,
        {useNewUrlParser: true, useUnifiedTopology: true,}).then(()=>console.log("MongoDB Connected"));
}
