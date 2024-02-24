import express from "express";
import { config } from "dotenv";
import morgan from "morgan"
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();

//middlewares
app.use(cors({origin:"http://localhost:3000",credentials:true}));
//Get,post,put,delete
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// this library of js help to log the details about development
app.use(morgan("dev"));

// this is middleware which is use to routing 
app.use("/api/v1", appRouter);


export default app;
