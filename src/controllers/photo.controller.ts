import { Request, Response } from "express";
import { Client } from "pg";
import getClient from "../client/elasticsearch";

class PhotoController {
  async create(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const client = new Client({
      host: "IP.DO.BANCO",
      port: 5432,
      database: "postgres",
      password: "SENHA",
      user: "postgres",
    });

    await client.connect();

    const { rows } = await client.query("SELECT * FROM PHOTOS");
    const clientElastic = getClient();

    for await (let row of rows) {
      (await clientElastic).index(
        {
          index: "photos",
          type: "type_photos",
          body: row,
        },
        (err: Error) => {
          if (err) {
            return response.status(400).json({ error: err });
          }
        }
      );
    }

    return response.status(201).json({ message: "Index ok!" });
  }

  async findAll(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const dataInicial = new Date().getTime();
    const client = getClient();

    const data = (await client).search({
      index: "photos",
      size: 6000,
    });

    const dataFinal = new Date().getTime();

    console.log("the result of Elasticsearch:", dataFinal - dataInicial);

    return response.json(data);
  }

  async findById(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const { id } = request.params;
    const client = getClient();

    const data = await (
      await client
    ).search({
      index: "photos",
      q: `id:${id}`,
    });

    return response.json(data.hits.hits);
  }

  async createPhoto(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const photo = {
      albumid: null,
      id: 99999,
      title: "Test title",
      url: "https://via.placeholder.com/600/bf37f1",
      thumbnailurl: null,
    };

    const client = getClient();

    const data = (await client).index({
      index: "photos",
      type: "type_photos",
      body: photo,
    });

    return response.status(201).json(data);
  }

  async findByQuery(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const client = getClient();

    const data = (await client).search({
      index: "photos",
      body: {
        query: {
          term: {
            "title.keyword": "Test Title",
          },
        },
      },
    });

    return response.status(200).json(data);
  }
}

export default new PhotoController();
