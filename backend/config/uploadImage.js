import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dinygudrg',
    api_key: '638877232143351',
    api_secret: '31Ya_YUlrGqescyFsZ3_2_gd8r0' // Click 'View API Keys' above to copy your API secret
});


export const uploadImage = async (path) => {
    const uploadResult = await cloudinary.uploader
        .upload(path)
        .catch((error) => {
            console.log(error);
        });

   return uploadResult?.secure_url
}



