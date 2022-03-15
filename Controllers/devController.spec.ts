import { Dev } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import Request from "supertest";
import { app } from "../app";

// POST METHOD TEST
describe("Post Dev with POST method with endpoint /dev", () => {
  it("Should sucessfully post a Dev", async () => {
    const response = await Request(app).post("/api/v1/dev").send({
      Nome: "Test Dev",
      Avatar: "",
      Carreira: "Test Developer",
      Github: "test",
      Linkedin: "test",
    });

    expect(response.statusCode).toBe(StatusCodes.CREATED);
  });

  it("Should fail to post a Dev because of missing attributes", async () => {
    const response = await Request(app).post("/api/v1/dev").send({
      Nome: "Cleo",
      Avatar: "",
      Github: "cleo",
      Linkedin: "cleo",
    });
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });
});

// GET METHOD TEST
describe("Get Devs with GET method with endpoint /dev", () => {
  it("Should sucessfully GET an array of Devs", async () => {
    const response = await Request(app).get("/api/v1/dev").send();

    expect(response.body.devs).toBeInstanceOf(Array);
    expect(response.statusCode).toBe(StatusCodes.ACCEPTED);
  });
});

// PUT METHOD CLASS
describe("UPDATE Devs with PUT method with endpoint /dev", () => {
  it("Should sucessfully UPDATE a Dev", async () => {
    const response1 = await Request(app).get("/api/v1/dev").send();
    const devs: Dev[] = response1.body.devs;
    const response = await Request(app).put("/api/v1/dev").send({
      id: devs[0].id,
      Nome: "Updated Test",
      Avatar: "",
      Carreira: "Test Update",
      Github: "updatedtest",
      Linkedin: "updatedtest",
    });

    expect(response.statusCode).toBe(StatusCodes.CREATED);
  });

  it("Should fail to UPDATE a Dev - missing id", async () => {
    const response = await Request(app).put("/api/v1/dev").send({
      Nome: "Updated Test",
      Avatar: "",
      Carreira: "Test Update",
      Github: "updatedtest",
      Linkedin: "updatedtest",
    });

    expect(response.statusCode).toBe(StatusCodes.NOT_ACCEPTABLE);
  });

  it("Should fail to UPDATE a Dev - missing data", async () => {
    const response = await Request(app).put("/api/v1/dev").send({
      id: "cl0rogbt80000wkuv0wxqlent",
    });

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });
});

// DELETE METHOD CLASS
describe("DELETE Devs with DELETE method with endpoint /dev", () => {
  it("Should sucessfully DELETE a Dev", async () => {
    const response1 = await Request(app).get("/api/v1/dev").send();
    const devs: Dev[] = response1.body.devs;
    const response = await Request(app).delete("/api/v1/dev").send({
      id: devs[0].id,
    });

    expect(response.statusCode).toBe(StatusCodes.ACCEPTED);
  });

  it("Should fail to DELETE a Dev - id is missing", async () => {
    const response = await Request(app).delete("/api/v1/dev").send();

    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  });
});
