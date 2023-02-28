const mongoose = require("mongoose")
require("dotenv").config()


const dbConnect = async () => {
    mongoose.set('strictQuery', false)
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('DB has connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

dbConnect()

// module.exports = dbConnect