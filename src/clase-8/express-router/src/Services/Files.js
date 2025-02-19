import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(import.meta.dirname,"/../public/img"));
    },
    filename: (request, file, callback) => {
        callback(null,`${Date.now()}-${file.originalname}`);
    },
})

const uploader = multer({
    storage
});
export default uploader;