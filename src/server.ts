import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import logger from "morgan";
import dotenv from 'dotenv';

import { Routes } from "./routes";
import createTables from "./database/setupDatabase";

dotenv.config();
 createTables();

const fileUpload = require("express-fileupload");
const sanitizer =  require("express-sanitizer");
const port = process.env.PORT;
const app: Application = express();


app.use(express.json())
app.use(fileUpload());
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(sanitizer());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet.hsts());
app.use(helmet.frameguard());
app.use(function(req: Request, res: Response, next: NextFunction) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.use("/api", Routes);

app.get( "/", ( req: Request, res: Response ) => {
  res.json({ message: "unauthenticated access" });
});

// start the express server
app.listen( port, () => {
    console.log(`server started at http://localhost:${port}`);
} );