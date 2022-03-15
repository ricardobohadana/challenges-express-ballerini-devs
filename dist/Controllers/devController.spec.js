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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
// POST METHOD TEST
describe("Post Dev with POST method with endpoint /dev", () => {
    it("Should sucessfully post a Dev", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).post("/api/v1/dev").send({
            Nome: "Test Dev",
            Avatar: "",
            Carreira: "Test Developer",
            Github: "test",
            Linkedin: "test",
        });
        expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.CREATED);
    }));
    it("Should fail to post a Dev because of missing attributes", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).post("/api/v1/dev").send({
            Nome: "Cleo",
            Avatar: "",
            Github: "cleo",
            Linkedin: "cleo",
        });
        expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.BAD_REQUEST);
    }));
});
// GET METHOD TEST
describe("Get Devs with GET method with endpoint /dev", () => {
    it("Should sucessfully GET an array of Devs", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get("/api/v1/dev").send();
        expect(response.body.devs).toBeInstanceOf(Array);
        expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.ACCEPTED);
    }));
});
// PUT METHOD CLASS
describe("UPDATE Devs with PUT method with endpoint /dev", () => {
    it("Should sucessfully UPDATE a Dev", () => __awaiter(void 0, void 0, void 0, function* () {
        const response1 = yield (0, supertest_1.default)(app_1.app).get("/api/v1/dev").send();
        const devs = response1.body.devs;
        const response = yield (0, supertest_1.default)(app_1.app).put("/api/v1/dev").send({
            id: devs[0].id,
            Nome: "Updated Test",
            Avatar: "",
            Carreira: "Test Update",
            Github: "updatedtest",
            Linkedin: "updatedtest",
        });
        expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.CREATED);
    }));
    it("Should fail to UPDATE a Dev - missing id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).put("/api/v1/dev").send({
            Nome: "Updated Test",
            Avatar: "",
            Carreira: "Test Update",
            Github: "updatedtest",
            Linkedin: "updatedtest",
        });
        expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE);
    }));
    it("Should fail to UPDATE a Dev - missing data", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).put("/api/v1/dev").send({
            id: "cl0rogbt80000wkuv0wxqlent",
        });
        expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.BAD_REQUEST);
    }));
});
// DELETE METHOD CLASS
describe("DELETE Devs with DELETE method with endpoint /dev", () => {
    it("Should sucessfully DELETE a Dev", () => __awaiter(void 0, void 0, void 0, function* () {
        const response1 = yield (0, supertest_1.default)(app_1.app).get("/api/v1/dev").send();
        const devs = response1.body.devs;
        const response = yield (0, supertest_1.default)(app_1.app).delete("/api/v1/dev").send({
            id: devs[0].id,
        });
        expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.ACCEPTED);
    }));
    it("Should fail to DELETE a Dev - id is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).delete("/api/v1/dev").send();
        expect(response.statusCode).toBe(http_status_codes_1.StatusCodes.NOT_FOUND);
    }));
});
