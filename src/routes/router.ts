import { Request, Response, Router } from "express";
import getClient from "../client/elasticsearch";
import DBController from "../controllers/db.controller";
import PhotoController from "../controllers/photo.controller";

const router = Router();

router.get("/db/create", DBController.create);
router.get("/photos/create", PhotoController.create);
router.get("/photos/findAll", PhotoController.findAll);
router.get("/photos/findById/:id", PhotoController.findById);
router.get("/photos/createPhoto", PhotoController.createPhoto);

router.get("/photos/findByQuery", PhotoController.findByQuery);

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
