import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URL!)
        let connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Connection established");
        })
        connection.on("error", () => {
            console.log("Connection error");
        })
    } catch (err) {
        console.log("mongodb connection error", err);
    }
}