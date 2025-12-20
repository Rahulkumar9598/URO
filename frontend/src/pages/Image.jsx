import React, { useState } from 'react'
import api from '../services/endpoint'
import axios from "axios"

const Image = () => {

    const [image, setImage] = useState("")



    const handleUploadImage = async (file) => {
        try {
            const url = URL.createObjectURL(file)
            // setImage(url)
            const formData = new FormData()
            formData.append("image", file);

            const res = await axios.post(api.image.uploadImage, formData)
            console.log(res, " this is image upload response");
            setImage(res.data.imageUrl)




        } catch (err) {
            console.log(err, "this is error ")
        }
    }

    return (
        <div className='bg-pink-100 p-100'>

            <div className='p-4 '>
                <input type="file" onChange={(e) => handleUploadImage(e.target.files[0])} className='border-1 border-amber-300' />

            </div>

            <div className='p-4 border-1 rounded-full h-30 w-30'>
                <img src={image}  className='bg-amber-300' />

            </div>

        </div>
    )
}

export default Image