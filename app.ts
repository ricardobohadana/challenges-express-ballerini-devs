import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express, { json } from "express";
import { env } from "process";
import logEvents from "./Middlewares/logEvents";
import devRouter from "./Routers/devRouter";

const allowedDomains = ["http://localhost:3000", undefined];

const app = express();
const environment = env.ENVIRONMENT === "dev";

export const prisma = new PrismaClient();
if (environment) {
  app.use(cors());
} else {
  app.use(
    cors({
      origin: (origin, callback) => {
        if (origin === undefined) {
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
}

app.use(json());

app.use(logEvents);

app.use("/api/v1", devRouter);

export { app };
