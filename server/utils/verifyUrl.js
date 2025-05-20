import ytdl from "@distube/ytdl-core";

export const extractVideoId = (url) => {
  try {
    return ytdl.getVideoID(url);
  } catch (err) {
    console.error("Invalid YouTube URL:", err);
    return null;
  }
};
