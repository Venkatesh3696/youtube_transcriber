import express from "express";
import { summarizeText } from "../services/sumarizer.js";

const router = express.Router();

router.post("/", summarizeText);

export default router;
