import { Router } from "express";
const  userRouter = Router()
import { handleUserSignup ,handleUserSignin, handleGetUserDetails, } from  '../controller/user.controllers.js'
import {handleCart} from '../controller/cart.controllers.js'



// userRouter.get("/home",handleUserLogin)
userRouter.post("/signup",handleUserSignup)
userRouter.post("/signin",handleUserSignin)
userRouter.post("/cart",handleCart )
userRouter.post("/handle-get-details" ,handleGetUserDetails)


export default userRouter


