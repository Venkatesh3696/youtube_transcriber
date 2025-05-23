import path, { dirname } from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "url";

import { handleDownloadAndConvert } from "../services/youtube_downloader.js";
import { transcribeAudioFile } from "../services/transcriber.js";
import { SummaryData } from "../models/summary_data.model.js";
import { extractVideoId } from "../utils/verifyUrl.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function paginateTranscript(paragraphs, pageSize) {
  const pages = [];
  for (let i = 0; i < paragraphs.length; i += pageSize) {
    const slice = paragraphs.slice(i, i + pageSize);
    pages.push(slice.join(" "));
  }
  return pages;
}

export const splitTranscriptIntoParagraphs = (words, maxPauseGap = 2.0) => {
  const paragraphs = [];
  let currentParagraph = [];
  let lastWordEnd = 0;

  for (const word of words) {
    const start = word.start ?? 0;
    const end = word.end ?? 0;

    const pause = start - lastWordEnd;

    currentParagraph.push(word.punctuated_word || word.word);

    if (pause >= maxPauseGap || /[.?!]$/.test(word.punctuated_word)) {
      paragraphs.push(currentParagraph.join(" "));
      currentParagraph = [];
    }

    lastWordEnd = end;
  }

  if (currentParagraph.length > 0) {
    paragraphs.push(currentParagraph.join(" "));
  }

  return paragraphs;
};

export const downloadAudioAndGenerateTranscript = async (req, res) => {
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

    const audioId = videoId + uuid();

    const audioPath = path.join(downloadsDir, `${audioId}.mp3`);
    await handleDownloadAndConvert(youtubeUrl, audioPath);

    const transcript = await transcribeAudioFile(audioPath);

    console.log({ transcript });

    const paragraphs = splitTranscriptIntoParagraphs(
      transcript.results.channels[0].alternatives[0].words
    );

    const transcriptPages = paginateTranscript(paragraphs, 7);

    const newSummaryData = new SummaryData({
      videoId: videoId,
      transcriptPages: transcriptPages,
    });

    await newSummaryData.save();

    fs.unlinkSync(audioPath);

    res.status(200).json({
      message: "transcript generated!",
      summaryData: newSummaryData,
    });
  } catch (error) {
    console.log("error summarizing video", error);
  }
};

export const fetchSummary = async (req, res) => {
  console.log("fetching summary");
  const { summaryid } = req.query;

  const existingSummary = await SummaryData.findById(summaryid);

  if (existingSummary) {
    return res.status(200).json({
      message: "transcript found in db ",
      summaryData: existingSummary,
    });
  }

  res.status(404).json({
    message: "no transcript found please provide correct id ",
    summaryData: existingSummary,
  });
};

export const editTranscript = async (req, res) => {
  console.log("edited summary");
  const { summaryid } = req.query;
  const { transcriptPages } = req.body;

  const existingSummary = await SummaryData.findById(summaryid);

  if (!existingSummary) {
    return res.status(400).json({
      message: `no transcript found with id ${summaryid} `,
      summaryData: existingSummary,
    });
  }

  existingSummary.transcriptPages = transcriptPages;
  res.status(200).json({
    message: "edited transcript successfully ",
  });
};

export const verifyYoutubeUrl = (req, res, next) => {
  const { youtubeUrl } = req.body;
  const videoId = extractVideoId(youtubeUrl);
  res.status(200).json({ videoId });
};
