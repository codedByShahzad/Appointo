
import  validator  from 'validator';
import  bcrypt  from 'bcrypt';
import { User } from '../models/userModal.js';
import jwt from 'jsonwebtoken'


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

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name, 
            email,
            password: hashedPassword
        }

        const newUser = new User(userData)
        const user = await newUser.save()
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.json({success: true, token})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error})
    }
}

const LoginUser = async(req,res)=>{
try{

    const {email, password} = req.body

    const user = await User.findOne({email})

    if(!user){
        return res.json({success: false, message: "User Not Found"})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(isMatch){
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        res.json({success: true, token})
    } else{
        return res.json({success: false, message: "Invalid Credantials"})
    }

} catch (error) {
        console.log(error)
        res.json({success: false, message: error})
    }
    

}

const getUserProfile = async (req, res) => {
    try {
        const userId = req.userId; // get userId from auth middleware
        if (!userId) {
            return res.status(401).json({ success: false, message: "Not Authorized" });
        }

        const userData = await User.findById(userId).select('-password');
        res.json({ success: true, userData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export {registerUser, LoginUser, getUserProfile}