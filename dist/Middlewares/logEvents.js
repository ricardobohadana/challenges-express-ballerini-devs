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
const date_fns_1 = require("date-fns");
function logEvents(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const dateTime = `${(0, date_fns_1.format)(new Date(), "dd/MM/yyyy\tHH:mm:ss")}`;
        const message = `${request.method}\t${request.headers.origin}\t${request.url}`;
        const logItem = `${dateTime}\t${request.path}\t${message}`;
        console.log(logItem);
        next();
    });
}
exports.default = logEvents;
