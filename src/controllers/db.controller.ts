import { Request, Response } from "express";
import { Client } from "pg";

export class DBController {
  async create(
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const initialDate = new Date().getTime();
    const client = new Client({
      host: "IP.DO.BANCO",
      port: 5432,
      database: "postgres",
      password: "SENHA",
      user: "postgres",
    });

    await client.connect();

    const { rows } = await client.query("SELECT * FROM PHOTOS");
    const finalDate = new Date().getTime();

    console.log("The final result:", finalDate - initialDate);

    return response.status(201).json(rows);
  }
}

