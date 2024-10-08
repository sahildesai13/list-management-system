import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_DB_URL || "mongodb://127.0.0.1:27017/", { dbName: "list" });
        console.log("connected with host ", connection.host);
    } catch (error) {
        console.log("error in Connecting DataBase", error);
    }
}