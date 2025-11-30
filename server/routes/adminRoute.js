import express from 'express'
import {addDoctor, adminLogin, allDoctors} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import { authAdmin } from '../middlewares/authAdmin.js'
import { changeAvailablity } from '../controllers/doctorController.js'

const adminRouter = express.Router()

adminRouter.post("/login", adminLogin)
adminRouter.post("/add-doctor", authAdmin ,upload.single('image') ,addDoctor)
adminRouter.post("/all-doctors", authAdmin, allDoctors)
adminRouter.post("/change-availabilty", authAdmin ,changeAvailablity)


export default adminRouter