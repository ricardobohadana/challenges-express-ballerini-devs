import Request from "supertest";
import { app } from "../app";

// Amanhã esrever testes sobre Dev controllers
describe("Getting users from db", () => {
  it("Get users with GET method from endpoint /dev", async () => {
    const response = await Request(app).post("/dev").send({
      Nome: "Cleo",
      Avatar: "",
      Carreira: "Software Developer",
      Github: "cleo",
      Linkedin: "cleo",
    });
  });
});
