const User = require("../model/User/User")
const Post = require("../model/Post/Post")
const appError = require("../utils/appError")


// create Post 
const postCreate = async (req, res, next) => {
    console.log(req.file);
    const { title, body, image } = req.body
    try {
        // find the user who is creating post
        const author = await User.findById(req.userAuth)
        // console.log(req.userAuth);
        // create the post
        const createPost = await Post.create({
            title,
            body,
            image: req && req.file ? req.file.path : undefined,
            user: author._id,
        })
        author.posts.push(createPost)
        await author.save()
        res.json({
            status: 'Post Created',
            result: createPost,
        })

    } catch (error) {
        next(appError(error.message))
    }
}

// get all posts
const getAllPost = async (req, res, next) => {
    try {
        const posts = await Post.find({})
            .populate("title")

        res.json({
            status: 'Posts',
            result: posts,
        })
    } catch (error) {
        next(appError(error.message))
    }
}

// delete 

const deletePost = async (req, res, next) => {
    try {
        // check if the post belongs to the user

        // find the post
        const post = await Post.findById(req.params.id)
        if (post.user.toString() !== req.userAuth.toString()) {
            return next(appError("You are not allowed to delete this post", 403))
        }
        await Post.findByIdAndDelete(req.params.id)
        res.json({
            status: 'Posts',
            result: "posts deleted successfully",
        })
    } catch (error) {
        next(appError(error.message))
    }
}

// update
const updatePost = async (req, res, next) => {
    try {
        // check if the post belongs to the user

        // find the post
        const post = await Post.findById(req.params.id)
        if (post.user.toString() !== req.userAuth.toString()) {
            return next(appError("You are not allowed to update this post", 403))
        }
        await Post.findByIdAndUpdate(req.params.id, {
            title,
            body,
            image: req?.file?.path
        })
        res.json({
            status: "Success",
            result: "Post updated Successfully"
        })
    } catch (error) {
        next(appError(error.message))
    }
}

module.exports = {
    postCreate,
    getAllPost,
    deletePost,
    updatePost,
}