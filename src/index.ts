import express, { Express, Request, Response } from "express";
import cors from "cors";
import router from "./routes";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/health", (_req: Request, res: Response) => {
  res.send("OK");
});

app.use("/api/v1", router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
