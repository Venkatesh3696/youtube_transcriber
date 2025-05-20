import path, { dirname } from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "url";

import { handleDownloadAndConvert } from "../services/youtube_downloader.js";
import { transcribeAudioFile } from "../services/transcriber.js";
import { summarizeText } from "../services/sumarizer.js";
import { SummaryData } from "../models/summary_data.model.js";
import { extractVideoId } from "../utils/verifyUrl.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const summarizePipeline = async (req, res) => {
  const { youtubeUrl } = req.body;

  if (!youtubeUrl) {
    return res
      .status(404)
      .json({ message: "please provide youtube video url" });
  }

  try {
    const downloadsDir = path.join(__dirname, "..", "downloads");

    const videoId = extractVideoId(youtubeUrl);

    if (!videoId) {
      return res.status(404).json({
        message:
          "the youtube url provided is not valid please provide a valid one",
      });
    }

    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }

    const existingSummary = await SummaryData.findOne({ videoId });

    if (existingSummary) {
      return res.status(200).json({
        message: "transcript found in db ",
        summaryData: existingSummary,
      });
    }

    const audioId = uuid();

    const audioPath = path.join(downloadsDir, `${audioId}.mp3`);
    await handleDownloadAndConvert(youtubeUrl, audioPath);

    const transcript = await transcribeAudioFile(audioPath);

    const summary = await summarizeText(transcript);

    const newSummaryData = new SummaryData({
      youtubeUrl,
      videoId,
      summary,
      transcript,
    });

    await newSummaryData.save();

    res.status(200).json({ summaryData: newSummaryData });
  } catch (error) {
    console.log("error summarizing video", error);
  }
};
