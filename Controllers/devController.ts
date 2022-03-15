import { prisma } from "../app";
import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Prisma } from "@prisma/client";
import Dev from "../Interfaces/Dev";

class devController {
  static properties = ["Nome", "Avatar", "Carreira", "Github", "Linkedin"];

  private static handleDbErrors(err: any, response: Response) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2001") {
        return response.sendStatus(StatusCodes.NOT_ACCEPTABLE);
      } else {
        return response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
      }
    }
  }

  private static checkAttributes(payload: Dev): boolean[] {
    const hasAllAttributes = this.properties.every((key) =>
      Object.prototype.hasOwnProperty.call(payload, key)
    );

    const hasOnlyAttributes = Object.entries(payload).every(
      ([key, value]) => this.properties.indexOf(key) !== -1
    );

    return [hasAllAttributes, hasOnlyAttributes];
  }

  // POST METHOD
  static async post(request: Request, response: Response) {
    const payload = request.body;

    if (!this.checkAttributes(payload).every((boolKey) => boolKey))
      return response.sendStatus(StatusCodes.BAD_REQUEST);

    const dev = payload;

    await prisma.dev.create({ data: dev });

    return response.sendStatus(StatusCodes.CREATED);
  }

  // GET METHOD
  static async get(request: Request, response: Response) {
    // console.log(prisma);
    // const dev = await prisma.dev.count();
    // return response.json({ data: dev });
    const devs = await prisma.dev.findMany();
    return response.status(StatusCodes.ACCEPTED).json({ devs: devs });
  }

  // UPDATE METHOD
  static async put(request: Request, response: Response) {
    const { id, Nome, Avatar, Carreira, Github, Linkedin } = request.body;
    var payload: Record<string, string> = {
      Nome: Nome,
      Avatar: Avatar,
      Carreira: Carreira,
      Github: Github,
      Linkedin: Linkedin,
    };

    Object.keys(payload).forEach(
      (key) => payload[key] === undefined && delete payload[key]
    );

    if (!Object.keys(payload).length)
      return response.sendStatus(StatusCodes.NOT_ACCEPTABLE);
    if (!id) return response.sendStatus(StatusCodes.NOT_ACCEPTABLE);

    if (!this.checkAttributes(payload).every((boolKey) => boolKey))
      return response.sendStatus(StatusCodes.BAD_REQUEST);

    try {
      await prisma.dev.update({
        where: {
          id: id,
        },
        data: { ...payload },
      });
      return response.sendStatus(StatusCodes.CREATED);
    } catch (err) {
      return this.handleDbErrors(err, response);
    }
  }

  //DELETE METHOD
  static async delete(request: Request, response: Response) {
    const { id } = request.body;

    if (!id) return response.sendStatus(StatusCodes.NOT_FOUND);

    try {
      await prisma.dev.delete({
        where: {
          id: id,
        },
      });

      return response.sendStatus(StatusCodes.ACCEPTED);
    } catch (err) {
      return this.handleDbErrors(err, response);
    }
  }
}

export default devController;
