import express, { Application, Request, Response } from "express";
import connectDb from "./config/db";
import { config } from "./config/config";
import cors from "cors";
import router from "./routes/index.routes";
import { errorHandler, notFound } from "./middleware/error.middleware";
import cookieParser from "cookie-parser";

const app: Application = express();

connectDb();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});

app.use(notFound);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log("App listening on port " + config.PORT);
});

export default app;
