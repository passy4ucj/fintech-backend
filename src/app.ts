require("dotenv").config();

import "express-async-errors";
// global.__basedir = __dirname;

// initialize the express app
import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();

// security middleware
import helmet from "helmet";
import cors from "cors";
import rateLimiter from "express-rate-limit";
const xssClean = require("xss-clean");


// application middleware
import { applicationRoutes } from "./routes";
import { errorHandler, errorHandlerMiddleware, notFound } from "./middleware";
import { StatusCodes } from "http-status-codes";
import Logger from "./logger";
import path from "path";

// use security middleware
// app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_BASE_URL!,
      process.env.DASHBOARD_BASE_URL!,
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:3003",
      "http://localhost:3004",
      "http://localhost:3005",
    ],
    credentials: true,
  })
);
// app.use(cors())
app.use(xssClean());

app.use(
  rateLimiter({
    windowMs: 60 * 1000,
    max: 60,
    handler: (_, res) => {
      return res
        .status(StatusCodes.TOO_MANY_REQUESTS)
        .json({ errors: [{ message: "Too many requests!" }] });
    },
  })
);


// endpoint url logs
app.use(function (req: Request, _: Response, next: NextFunction) {
  const requestMethod = req.method;
  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  Logger.info(`[ ${requestMethod} ] ${fullUrl}`);
  next();
});


app.use(express.static(path.join(__dirname, '/../src/resources/static/assets/uploads/')))

// home route
app.get("/api/v1", (_: Request, res: Response, next: NextFunction) => {
  res
    .status(StatusCodes.OK)
    .json({ message: "FINTECH BACKEND 1.0 🔥🔥🔥" });
});

app.get("/api/v1/auth/error", (_: Request, res: Response, next: NextFunction) => {
    res.send("Authentication failed");
});

app.use("/api/v1", applicationRoutes);


// Use error Middleware
// error handler middleware
app.use(errorHandlerMiddleware);

// not found middleware
app.use(notFound);



export default app;
