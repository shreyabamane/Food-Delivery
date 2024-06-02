import jwt from "jsonwebtoken";


const authMidddleware = async(req, res, next) => {
    //token from the users using the headers
    //destructure the token from req.header
    const {token} = req.headers;

    // check if we got token or not
    if (!token) {
        return res.json({success:false, message:"Not Authorized Login Again"})
    }

    //if we had token, decode that token
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}


export default authMidddleware;