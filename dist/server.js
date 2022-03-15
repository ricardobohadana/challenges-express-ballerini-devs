"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const app_1 = require("./app");
app_1.app.listen(process_1.env.PORT || 3001, () => console.log("API ONLINE"));
