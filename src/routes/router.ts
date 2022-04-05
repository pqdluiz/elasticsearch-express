import { Request, Response, Router } from "express";
import getClient from "../client/elasticsearch";
import DBController from "../controllers/db.controller";
import { PhotoController } from "../controllers/photo.controller";

const router = Router();
const photo = new PhotoController();

router.get("/db/create", DBController.create);
router.get("/photos/create", photo.create);
router.get("/photos/findAll", photo.findAll);
router.get("/photos/findById/:id", photo.findById);
router.get("/photos/createPhoto", photo.createPhoto);
router.get("/photos/findByQuery", photo.findByQuery);

router.get("/", async (request: Request, response: Response) => {
  const client = getClient();

  // Criar um registro no elasticsearch
  const result = (await client).index({
    index: "elastic_teste",
    type: "type_elastic_teste",
    body: {
      user: "Luiz",
      password: "sd8234udf",
      email: "luizlima@example.com",
    },
  });

  // Fazer uma busca

  return response.status(200).json(result);
});

export { router };
