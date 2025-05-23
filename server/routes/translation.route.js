import { Router } from "express";
import { translateText } from "../services/translator.js";

const router = Router();

router.post("/", translateText);

export default router;
