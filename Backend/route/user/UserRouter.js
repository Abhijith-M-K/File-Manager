const express = require("express");
const router = express.Router();

const {register, login,uploadFile,findFile,userData}= require("../../controllers/user/userController");
const authMiddleWare = require("../../middlewares/authMiddleware");
const storage = require("../../utils/multer");


router.post("/register",register);
router.post("/login",login);
router.post("/uploadfile",storage.single("file"),authMiddleWare,uploadFile);
router.get("/userdata",authMiddleWare,userData)
router.get("/findfile",authMiddleWare,findFile)





module.exports = router;