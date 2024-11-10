import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import { connectDB } from "./utilities/connectDB.js";
import userRoute from "./routes/user.route.js"
import taskRoute from "./routes/task.route.js"

dotenv.config();

const app = express();

app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))
app.use(express.json());
app.use(cookieParser());


app.use("/api/user", userRoute);
app.use("/api/task", taskRoute);


app.listen(process.env.PORT, () => {
    connectDB();
    console.log("Server is ready and listening on " + process.env.PORT);
});
