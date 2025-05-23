import fs from "fs";
import { createClient } from "@deepgram/sdk";
import { configDotenv } from "dotenv";

configDotenv();

export const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

export const transcribeAudioFile = async (filePath) => {
  console.log("creating transcript");

  const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
    fs.readFileSync(filePath),
    {
      // model: "nova-3",
      smart_format: true,
    }
  );

  console.log("created transcript");

  if (error) throw error;
  return result;
  // return result.results.channels[0].alternatives[0].transcript;
};
