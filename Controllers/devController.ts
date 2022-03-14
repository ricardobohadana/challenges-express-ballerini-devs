import { prisma } from "../server";
import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Prisma } from "@prisma/client";
import Dev from "../Interfaces/Dev";

class DevController {
  static properties = ["Nome", "Avatar", "Carreira", "Github", "Linkedin"];

  private static handleDbErrors(err: any, response: Response) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2001") {
        return response
          .status(StatusCodes.NOT_FOUND)
          .send(ReasonPhrases.NOT_FOUND);
      } else {
        return response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
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
      return response
        .status(StatusCodes.BAD_REQUEST)
        .send(ReasonPhrases.BAD_REQUEST);

    const dev = payload;

    await prisma.dev.create({ data: dev });

    return response.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
  }

  // GET METHOD
  static async get(request: Request, response: Response) {
    const devs = await prisma.dev.findMany();
    return response
      .status(StatusCodes.ACCEPTED)
      .json(devs)
      .send(ReasonPhrases.ACCEPTED);
  }

  // UPDATE METHOD
  static async put(request: Request, response: Response) {
    const { devId, Nome, Avatar, Carreira, Github, Linkedin } = request.body;
    const payload = {
      Nome: Nome,
      Avatar: Avatar,
      Carreira: Carreira,
      Github: Github,
      Linkedin: Linkedin,
    };
    if (!devId)
      return response
        .status(StatusCodes.NOT_FOUND)
        .send(ReasonPhrases.NOT_FOUND);

    if (!this.checkAttributes(payload).every((boolKey) => boolKey))
      return response
        .status(StatusCodes.BAD_REQUEST)
        .send(ReasonPhrases.BAD_REQUEST);

    try {
      await prisma.dev.update({
        where: {
          id: devId,
        },
        data: {
          Nome: payload.Nome,
          Avatar: payload.Avatar,
          Carreira: payload.Carreira,
          Github: payload.Github,
          Linkedin: payload.Linkedin,
        },
      });
      return response.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
    } catch (err) {
      return this.handleDbErrors(err, response);
    }
  }

  //DELETE METHOD
  static async delete(request: Request, response: Response) {
    const { devId } = request.body;

    if (!devId)
      return response
        .status(StatusCodes.NOT_FOUND)
        .send(ReasonPhrases.NOT_FOUND);

    try {
      await prisma.dev.delete({
        where: {
          id: devId,
        },
      });

      return response.status(StatusCodes.ACCEPTED).send(ReasonPhrases.ACCEPTED);
    } catch (err) {
      return this.handleDbErrors(err, response);
    }
  }
}

export default DevController;
