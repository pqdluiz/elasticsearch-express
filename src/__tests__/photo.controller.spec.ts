import supertest from "supertest";
import { PhotoController } from "../controllers/photo.controller";

const photo = new PhotoController();

describe("PhotoController", () => {
  test("Create", () => {
    const result = supertest(photo.create).post("/photos/create");
    expect(result).toBeDefined();
  });

  test("Find All", () => {
    const result = supertest(photo.findAll).get("/photos/findAll");
    expect(result).toBeDefined();
  });

  test("Find all Query", () => {
    const result = supertest(photo.findByQuery).get(
      "/photos/findByQuery"
    );
    expect(result).toBeDefined();
  });

  test("Find by ID", () => {
    const result = supertest(photo.findById).get("/photos/findById/:id");
    expect(result).toBeDefined();
  });

  test("Create photo", () => {
    const result = supertest(photo.createPhoto).post(
      "/photos/createPhoto"
    );
    expect(result).toBeDefined();
  });
});
