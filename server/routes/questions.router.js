import { Router } from "express";
import {
  generateObjectiveQuestions,
  generateSubjectiveQuestions,
} from "../controllers/questionary.controller.js";

const router = Router();

router.post("/objective", generateObjectiveQuestions);
router.post("/subjective", generateSubjectiveQuestions);

export default router;
