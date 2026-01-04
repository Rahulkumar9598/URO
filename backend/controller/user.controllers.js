import axios from 'axios'
import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


export const handleUserSignup = async (req, res, next) => {
    try {
        console.log(req.body)
        const { name, email, password } = req.body;

        if (!name || !email || !password) {

            const error = new Error("All fields are required");
            error.status = 400;
            error.success = false;
            error.error = true;
            return next(error);
        }


        const userExist = await User.findOne({ email });
        console.log(userExist)

        if (userExist) {

            const error = new Error("This email is already register ");
            error.status = 400;
            error.success = false;
            error.error = true;
            return next(error);

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
        next(err)

    }
}

export const handleUserSignin = async (req, res, next) => {
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
            const error = new Error("This email is not registered");
            error.status = 400;
            return next(error);
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        // console.log(pass)
        if (!isMatch) {
            const error = new Error("Password not match");
            error.status = 400;
            return next(error);
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
        next(err)
    }

}

export const handleGetUserDetails = async (req, res, next) => {
    try {
        const { token } = req.body
        const data = jwt.decode(token)

        console.log(data.userId, "this is my token  ")
        const user = await User.findById(data.userId)
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

    } catch (err) {
        next(err)
    }


}