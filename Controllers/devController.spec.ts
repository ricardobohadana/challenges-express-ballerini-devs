import { Dev } from "@prisma/client";
import Request from "supertest";
import { app } from "../app";

// Amanhã esrever testes sobre Dev controllers
describe("Post Dev with POST method with endpoint /dev", () => {
  it("Should sucessfully post a Dev", async () => {
    const response = await Request(app).post("/api/v1/dev").send({
      Nome: "Cleo",
      Avatar: "",
      Carreira: "Software Developer",
      Github: "cleo",
      Linkedin: "cleo",
    });

    expect(response.statusCode).toBe(201);
  });

  it("Should fail to post a Dev because of missing attributes", async () => {
    const response = await Request(app).post("/api/v1/dev").send({
      Nome: "Cleo",
      Avatar: "",
      Github: "cleo",
      Linkedin: "cleo",
    });
    expect(response.statusCode).toBe(400);
  });
});

describe("Get Devs with GET method with endpoint /dev", () => {
  it("Should sucessfully GET an array of Devs", async () => {
    const response = await Request(app).get("/api/v1/dev").send();

    expect(response.body.devs).toBeInstanceOf(Array);
    expect(response.statusCode).toBe(202);
  });
});
