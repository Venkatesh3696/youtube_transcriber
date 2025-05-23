import express from "express";
import {
  downloadAudioAndGenerateTranscript,
  editTranscript,
  fetchSummary,
  verifyYoutubeUrl,
} from "../controllers/transcript.controller.js";

const router = express.Router();

router.post("/", downloadAudioAndGenerateTranscript);
router.get("/", fetchSummary);
router.post("/edit", editTranscript);

router.post("/verifyurl", verifyYoutubeUrl);

export default router;
