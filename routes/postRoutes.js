const express = require("express")
const storage = require("../config/cloudinary")
const multer = require("multer")
const postRouter = express.Router()
const { postCreate, getAllPost, deletePost, updatePost } = require("../Controllers/postCtrl")
const isLogin = require("../middleware/isLogin")

// file upload middleware
const upload = multer({ storage })


postRouter.post("/", isLogin, upload.single("image"), postCreate)

postRouter.get("/get-post", isLogin, getAllPost)

postRouter.delete("/delete/:id", isLogin, deletePost)

postRouter.put("/update/:id", isLogin, updatePost)

module.exports = postRouter