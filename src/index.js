import express from "express"
import { configDotenv } from "dotenv"
import dbConnect  from "./config/dbConnect.js"
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"

configDotenv()
// dotenv.config()

const app = express()
const PORT = process.env.PORT || 7002

app.use(express.json())
app.use(express.urlencoded())

//database connection call
dbConnect()
 .then(()=>{
    app.on("ERROR", (error) => {
        console.log("ERR: ", error)
        throw error
    })

    app.listen(PORT, ()=> {
       console.log(`Server is running on port: ${PORT}`)
    })
 })
 .catch(err => console.log("Failed to connect database: ", err))

 //ROUTES
 app.use("/api/v1/auth/", authRouter)
 app.use("/api/v1/users/", userRouter)

export default app