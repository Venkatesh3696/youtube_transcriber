import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const translateText = async (req, res) => {
  const { text, targetLang } = req.body;
  console.log(targetLang);
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-prover-v2:free",
        messages: [
          { role: "system", content: "You are a helpful language translator." },
          {
            role: "user",
            content: `Translate the following text into ${targetLang}:\n\n${text}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log({ response });

    const translatedText = response.data.choices[0].message.content.trim();

    res.status(200).json({ translatedText });
  } catch (error) {
    console.error(
      "❌ Error translating text:",
      error.response?.data || error.message
    );
    throw new Error("Failed to translate text using OpenRouter.");
  }
};
