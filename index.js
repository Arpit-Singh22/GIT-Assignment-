const express = require("express")
const globalErrorHandler = require("./middleware/globalErrorHandler")
require("./config/dbConnect")
require("dotenv").config()
const app = express()
app.use(express.json())     // to pass incoming payload



const userRouter = require("./routes/userRouter")
const postRouter = require("./routes/postRoutes")


// user Routes
app.use("/api/users/", userRouter)

// post routes
app.use("/api/posts/", postRouter)


// Error Handlers
app.use(globalErrorHandler)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
})