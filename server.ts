import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express, { json } from "express";
import { env } from "process";
import logEvents from "./Middlewares/logEvents";
import devRouter from "./Routers/devRouter";

const DEV = true;

const allowedDomains = ["http://localhost:3000", undefined];

const app = express();

export const prisma = new PrismaClient();

app.use(
  cors({
    origin: (origin, callback) => {
      if (DEV) {
        return;
      } else if (origin === undefined) {
        callback(new Error("Not allowed origin by CORS"));
      } else if (allowedDomains.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed origin by CORS"));
      }
    },
    optionsSuccessStatus: 200,
  })
);

app.use(json());

app.use(logEvents);

app.use("/api/v1", devRouter);

app.listen(env.PORT || 3001, () => console.log("API ONLINE"));
