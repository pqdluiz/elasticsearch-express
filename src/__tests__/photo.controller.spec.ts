import supertest from "supertest";
import { PhotoController } from "../controllers/photo.controller";

const photo = new PhotoController();

describe("PhotoController", () => {
  it("Create", () => {
    const result = supertest(photo.create).post("/photos/create");
    expect(result).toEqual(201);
  });

  it("Find All", () => {});

  it("Find all Query", () => {});

  it("Find by ID", () => {});

  it("Create photo", () => {});
});
