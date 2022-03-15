"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const http_status_codes_1 = require("http-status-codes");
const client_1 = require("@prisma/client");
class devController {
    static handleDbErrors(err, response) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2001") {
                return response.sendStatus(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE);
            }
            else {
                return response.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        }
    }
    static checkAttributes(payload) {
        const hasAllAttributes = this.properties.every((key) => Object.prototype.hasOwnProperty.call(payload, key));
        const hasOnlyAttributes = Object.entries(payload).every(([key, value]) => this.properties.indexOf(key) !== -1);
        return [hasAllAttributes, hasOnlyAttributes];
    }
    // POST METHOD
    static post(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = request.body;
            if (!this.checkAttributes(payload).every((boolKey) => boolKey))
                return response.sendStatus(http_status_codes_1.StatusCodes.BAD_REQUEST);
            const dev = payload;
            yield app_1.prisma.dev.create({ data: dev });
            return response.sendStatus(http_status_codes_1.StatusCodes.CREATED);
        });
    }
    // GET METHOD
    static get(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const devs = yield app_1.prisma.dev.findMany();
            return response.status(http_status_codes_1.StatusCodes.ACCEPTED).json({ devs: devs });
        });
    }
    // UPDATE METHOD
    static put(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, Nome, Avatar, Carreira, Github, Linkedin } = request.body;
            var payload = {
                Nome: Nome,
                Avatar: Avatar,
                Carreira: Carreira,
                Github: Github,
                Linkedin: Linkedin,
            };
            Object.keys(payload).forEach((key) => payload[key] === undefined && delete payload[key]);
            if (!Object.keys(payload).length)
                return response.sendStatus(http_status_codes_1.StatusCodes.BAD_REQUEST);
            if (!id)
                return response.sendStatus(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE);
            try {
                yield app_1.prisma.dev.update({
                    where: {
                        id: id,
                    },
                    data: Object.assign({}, payload),
                });
                return response.sendStatus(http_status_codes_1.StatusCodes.CREATED);
            }
            catch (err) {
                return this.handleDbErrors(err, response);
            }
        });
    }
    //DELETE METHOD
    static delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.body;
            if (!id)
                return response.sendStatus(http_status_codes_1.StatusCodes.NOT_FOUND);
            try {
                yield app_1.prisma.dev.delete({
                    where: {
                        id: id,
                    },
                });
                return response.sendStatus(http_status_codes_1.StatusCodes.ACCEPTED);
            }
            catch (err) {
                return this.handleDbErrors(err, response);
            }
        });
    }
}
devController.properties = ["Nome", "Avatar", "Carreira", "Github", "Linkedin"];
exports.default = devController;
