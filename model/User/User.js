const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        requred: [true, 'Email is required']
    },
    password: {
        type: String,
        requred: [true, 'Password is required']
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"             // to model
        }
    ]
},
    { timestamps: true }
)

// userSchema.pre('find', function (next) {
//     this.populate({
//         path: posts,
//     })
// })

const User = mongoose.model("user", userSchema)

module.exports = User