import express, { Application, Request, Response } from "express";
import connectDb from "./config/db";
import { config } from "./config/config";
import cors from "cors";
import router from "./routes/index.routes";
import { errorHandler, notFound } from "./middleware/error.middleware";

const app: Application = express();

connectDb();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.use(notFound);
app.use(errorHandler);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});

app.listen(config.PORT, () => {
  console.log("App listening on port " + config.PORT);
});

export default app;
