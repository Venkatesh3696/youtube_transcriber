import express from "express";
import { summarizePipeline } from "../controllers/summarize.controller.js";

const router = express.Router();

router.post("/", summarizePipeline);

export default router;
