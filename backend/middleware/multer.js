import multer from "multer"

export const upload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 200000000 }
})
