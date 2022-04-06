import supertest from "supertest";
import { DBController } from "../controllers/db.controller";

const db = new DBController();

describe("DBController", () => {
  it("Create", () => {
    const result = supertest(db.create).post("/db/create");
    expect(result).toBeDefined();
  });
});
