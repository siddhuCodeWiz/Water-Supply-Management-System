import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {UserRouter} from "./routes/users.js"
import {recipesRouter} from "./routes/recipes.js"
import { MapRouter } from "./routes/schema.js";
const app=express();

app.use(express.json());
app.use(cors());

app.use("/auth",UserRouter);
app.use("/recipes",recipesRouter);
app.use('/maps', MapRouter);


mongoose.connect("mongodb://127.0.0.1:27017/users");

app.listen(3006,()=>console.log("SERVER STARTEDD"));
