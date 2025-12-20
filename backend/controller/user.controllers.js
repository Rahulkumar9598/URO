import axios from 'axios'
import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


export const handleUserSignup = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({
                message: "All field are required",
                error: true,
                success: false

            })
        }
        const userExist = await User.findOne({ email });
        console.log(userExist)

        if (userExist) {
            return res.status(400).json({ msg: "user already exist" });
        }


        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(password, salt);


        const user = new User({

            name,
            email,
            password: hashpassword,

        })

        await user.save()


        return res.json({
            message: "user Registerd successfully",
            error: false,
            success: true,
            user
        })

    } catch (err) {
        console.log(err)

    }
}

export const handleUserSignin = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({
                message: " Email and password are required",
                error: true,
                success: false
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "This email is not registerd",
                error: true,
                success: false
            })
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        // console.log(pass)
        if (!isMatch) {
            return res.status(400).json({
                message: " password not match",
                error: true,
                succcess: false

            })
        }


        const token = jwt.sign({ userId: user._id }, 'cfvgbhnjmklkjhgf');

        return res.json({
            message: "User login successfully",
            error: false,
            success: true,
            user,
            token

        })
    } catch (err) {
        console.log(err)
    }

}

export const handleGetUserDetails = async (req, res) => {

    const { token } = req.body
    const data = jwt.decode(token)

    console.log(data.userId , "this is my token  ")
    const user = await User.findById(data.userId )
    console.log(user, " this is user ")

    if (!user) {
        return res.status(404).json({
            message: " user not found",
            success: true,
            error: false
        })
    }
    return res.status(200).json({
        message: "this is user details",
        success: true,
        error: false,
        user
    })
}