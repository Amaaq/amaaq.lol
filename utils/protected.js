const {verify} = require("jsonwebtoken");
const User = require("../models/user");
const protected = async (req,res,next)=>{
    const authorization = req.cookies
    if(!authorization) 
        return res.status(500).json({
            message: "No token!!",
            type: "error"
        })
    let id;
    try {
        id = verify(authorization,process.env.ACCESS_TOKEN_SECRET).id
    } catch{
        return res.status(500).json({
            auth : authorization,
            message: "Invalid token!!",
            type: "error"
        })
    }
    if(!id)
        return res.status(500).json({
            message: "Invalid token!!",
            type: "error"
        })
    const user = await User.findById(id);
    if(!user)
        return res.status(500).json({
            message: "User doesn't exist!",
            type: "error"
        });
    req.user = user;
    next()
}
module.exports = {protected}