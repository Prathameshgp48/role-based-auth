import mongoose from "mongoose"

const dbConnect = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(`Database connected: ${connectionInstance.connection.host}, ${connectionInstance.connection.name}`)
    } catch (error) {
        console.log("Failed to Connect MongoDB:", error)
        process.exit(1)
    }
}

export default dbConnect