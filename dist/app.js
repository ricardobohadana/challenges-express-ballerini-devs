"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importStar(require("express"));
const process_1 = require("process");
const logEvents_1 = __importDefault(require("./Middlewares/logEvents"));
const devRouter_1 = __importDefault(require("./Routers/devRouter"));
const allowedDomains = ["https://www.challenges-express-devs.heroku.com"];
const app = (0, express_1.default)();
exports.app = app;
const environment = process_1.env.ENVIRONMENT === "dev";
exports.prisma = new client_1.PrismaClient();
if (environment) {
    app.use((0, cors_1.default)());
}
else {
    app.use((0, cors_1.default)({
        origin: (origin, callback) => {
            if (origin === undefined) {
                callback(new Error("Not allowed origin by CORS"));
            }
            else if (allowedDomains.indexOf(origin) !== -1) {
                callback(null, true);
            }
            else {
                callback(new Error("Not allowed origin by CORS"));
            }
        },
        optionsSuccessStatus: 200,
    }));
}
app.use((0, express_1.json)());
app.use(logEvents_1.default);
app.use("/api/v1", devRouter_1.default);
