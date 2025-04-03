const mongoose = require("mongoose")

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_URI, {})
        console.log("DB connected")
    } catch (error) {
        console.error("db connection error", error)
        process.exit(1);
    }
}

module.exports = connectDB;