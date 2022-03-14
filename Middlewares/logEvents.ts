import { format } from "date-fns";
import { NextFunction, Request, Response } from "express";

async function logEvents(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const dateTime = `${format(new Date(), "dd/MM/yyyy\tHH:mm:ss")}`;
  const message = `${request.method}\t${request.headers.origin}\t${request.url}`;
  const logItem = `${dateTime}\t${request.path}\t${message}`;
  console.log(logItem);
  next();
}

export default logEvents;
