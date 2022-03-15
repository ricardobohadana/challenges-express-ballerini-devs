"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const devController_1 = __importDefault(require("../Controllers/devController"));
const devRouter = (0, express_1.Router)();
devRouter
    .route("/dev")
    // Create
    .post((request, response) => devController_1.default.post(request, response))
    // Read
    .get((request, response) => devController_1.default.get(request, response))
    // Update
    .put((request, response) => devController_1.default.put(request, response))
    // Delete
    .delete((request, response) => devController_1.default.delete(request, response));
exports.default = devRouter;
