import { Router } from "express"; 
import { handleUploadImage } from "../controller/imageController.js";
import { upload } from "../middleware/multer.js";


const imageRouter = Router()


imageRouter.post("/user-image" , upload.single("image") ,handleUploadImage)

export default imageRouter