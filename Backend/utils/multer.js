const multer = require("multer")
const path = require('path')

//multer config

module.exports = multer({
    storage:multer.diskStorage({}),
        fileFilter:(req,file,cb)=>{
            console.log("gggg");
            let ext = path.extname(file.originalname)
            if(ext!== ".pdf" && ext !== ".jpeg" && ext !==".png"){
                cb(new Error("File type is not supported"),false)
                return;
            }
            cb(null, true)

        }
})