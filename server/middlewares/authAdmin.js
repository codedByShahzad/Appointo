import jwt from "jsonwebtoken"

// Admin Authentication Middleware

export const autAdmin = async(req, res, next) =>{
    try{
        const {atoken} = req.headers
        if(!atoken){
            res.json({success: false, message: "Not Authorized Login Again"})
        }
        const decoded_tokken = jwt.verify(atoken, process.env.JWT_SECRET)
        if(decoded_tokken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            res.json({success: false, message: "Not Authorized Login Again"})
        }
        next();
    } catch(error){
        res.json({success: false, message: error.message})
    }
}