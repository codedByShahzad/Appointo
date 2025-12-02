
import { validator } from 'validator';


// Api to register User

const registerUser = async(req, res) =>{
    try{
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return res.json({success: false, message: "Missing Field"})
        }
        
        if(!validator.isEmail(email)){
            return res.json({success:false, message: "Enter a Valid Email"})
        }

        if(password.length < 8){
            res.json({sucess: false, message:"Enter a strong password"})
        }

    } catch (error) {
        res.json({success: false, message: error})
    }
}