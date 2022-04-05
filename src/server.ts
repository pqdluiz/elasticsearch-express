import express from "express";
import { router } from "./routes/router";

const app = express();

app.use(express.json());
app.use(router);

app.listen(3333, () => {
  console.log(`Server started to port http://localhost:3333`);
});
