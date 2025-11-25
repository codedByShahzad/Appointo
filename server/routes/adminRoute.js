import express from 'express'
import {addDoctor, adminLogin, allDoctors} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import { autAdmin } from '../middlewares/authAdmin.js'

const adminRouter = express.Router()

adminRouter.post("/add-doctor", autAdmin ,upload.single('image') ,addDoctor)
adminRouter.post("/all-doctors", autAdmin, allDoctors)
adminRouter.post("/login", adminLogin)


export default adminRouter