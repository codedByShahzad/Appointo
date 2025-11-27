import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import { Doctor } from "../models/doctorModal.js";
import jwt from "jsonwebtoken"

// Api for Adding Doctors

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      available,
      fee,
      date,
      address,
    } = req.body;
    const imageFile = req.file;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !available ||
      !fee ||
      !date ||
      !address ||
      !req.file
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

   if (!password || password.length < 8) {
  return res
    .status(400)
    .json({ success: false, message: "Password must be at least 8 characters" });
}

    // hashing Doctor Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Uploading images to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });
    const imageURL = imageUpload.secure_url;

    // Gathering the Final Doctors Data
    const doctorData = {
      name,
      email,
      image: imageURL,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fee,
      address: JSON.parse(address),
      date: Date.now(),
      available: true
    };

    // Adding Data to the Database
    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const adminLogin = async(req,res) =>{
  try{
    const {email, password} = req.body

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password, process.env.JWT_SECRET)
      res.json({success: true, token, message: "Admin is Loged In"})
    } else{
      res.json({success: false, message: "Invalid Credientials"})
    }
    
  } catch(error){
    console.log(error);
    res.json({ success: false, message: error.message });

  }
}

const allDoctors = async(req, res)=>{
  try{
    const doctors = await Doctor.find({}).select("-password")
    res.json({success: true, doctors})
  } catch(error){
    console.log(error)
    res.json({success: false, message: "Cannot get Doctoes"})
  }
}

export { addDoctor, adminLogin, allDoctors };
