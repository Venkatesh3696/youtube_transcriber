import ytdl from "@distube/ytdl-core";
import fs from "fs";

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
    const stream = ytdl(youtubeUrl, bestAudio);

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
    console.log("audio downloaded", outputPath);
  });
};

export const handleDownloadAndConvert = async (youtubeUrl, outputPath) => {
  try {
    await handleDownloadAndConvert(youtubeUrl, audioPath);
  } catch (err) {
    console.error("Audio download failed:", err);
    return res.status(500).json({
      message:
        "Failed to download audio. YouTube may be blocking the server IP.",
      error: err.message,
    });
  }
};
