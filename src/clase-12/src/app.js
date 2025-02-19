import express from "express";
import mongoose, { mongo } from "mongoose";
import userRouter from "./routes/user.router.js";

const app = express(),
    PORT = 8080;

const connectionMongoDB = async () => {
    try{
        const connection = await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASS}@${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority&appName=${process.env.MONGO_DB_CLUSTER}`);
        console.log(`Connected to mongoose`);
    }catch(error){
        console.log(error);
    }
};


app.use(express.json());

app.use("/api/users",userRouter);

app.listen(PORT, () => {
    console.log(`SERVER STARTED @ ${PORT}`);
    connectionMongoDB();
});