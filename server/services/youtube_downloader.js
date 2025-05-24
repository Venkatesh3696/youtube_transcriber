import ytdl from "@distube/ytdl-core";
import { configDotenv } from "dotenv";
import fs from "fs";

import { HttpsProxyAgent } from "https-proxy-agent";

configDotenv();

const agent = new HttpsProxyAgent(process.env.PROXY_URL);

function selectBestAudioFormat(formats) {
  return formats
    .filter((format) => format.hasAudioTrack)
    .sort((a, b) => b.bitrate - a.bitrate)
    .find(
      (format) =>
        format.mimeType.includes("audio/mp4") ||
        format.mimeType.includes("audio/webm")
    );
}

export const downloadAudioFromYoutube = async (youtubeUrl, outputPath) => {
  const info = await ytdl.getInfo(youtubeUrl);
  const audioFormats = info.formats.filter((format) =>
    format.mimeType?.includes("audio")
  );

  const bestAudio = selectBestAudioFormat(audioFormats);

  return new Promise((resolve, reject) => {
    const stream = ytdl(youtubeUrl, {
      format: bestAudio,
      requestOptions: agent,
    });

    stream.on("error", (err) => {
      console.error("ytdl error:", err);
      reject(err);
    });

    stream
      .pipe(fs.createWriteStream(outputPath))
      .on("finish", () => {
        resolve();
      })
      .on("error", (err) => {
        console.error("Write stream error:", err);
        reject(err);
      });
    console.log("audio downloaded");
  });
};

export const handleDownloadAndConvert = async (youtubeUrl, outputPath) => {
  try {
    await downloadAudioFromYoutube(youtubeUrl, outputPath);
  } catch (err) {
    console.error("Overall process failed:", err);
  }
};
