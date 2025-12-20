import mongoose from "mongoose";
import { uploadImage } from "../config/uploadImage.js";


export const handleUploadImage = async(req ,res )=>{
    try{
        const path = req.file.path
        const imageUrl = await uploadImage(path)
        console.log(imageUrl , "this is url")
        

        return res.status(200).json({
            message:" upload successfully",
            error: false,
            success:true,
            imageUrl


        })

    }
    catch(err){
       console.log(err , "this is backend image upload error")
    }
}