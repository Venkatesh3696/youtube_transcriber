import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import transcriptRouter from "./routes/downloader.router.js";
import summaryRouter from "./routes/summary.router.js";
import translationRouter from "./routes/translation.route.js";
import questionaryRouter from "./routes/questions.router.js";
import { connectDb } from "./config/dbConfig.js";
import { corsOptions } from "./config/corsConfig.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));

app.use("/api/transcript", transcriptRouter);

app.use("/api/summary", summaryRouter);

app.use("/api/translate", translationRouter);

app.use("/api/questionary", questionaryRouter);

app.use("/api/auth", questionaryRouter);

app.get("/", (req, res) => {
  res.json({ message: "hi welcome to transcribe! " });
});

const PORT = process.env.PORT || 5000;
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is listening at port ${PORT}`);
    });
  })
  .catch((e) => {
    console.error("Mongo db connection error : ", e);
    process.exit(1);
  });
