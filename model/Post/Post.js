const { Schema, model } = require("mongoose")

const postSchema = Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    image: {
        type: String,
        requred: [true, 'Post Image is required']
    },
    body: {
        type: String,
        requred: [true, 'Body of post is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        requred: [true, 'Post author is required']
    }
},
    { timestamps: true }
)

const Post = model("post", postSchema)

module.exports = Post