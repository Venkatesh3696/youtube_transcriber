import axios from "axios";

export const summarizeText = async (text) => {
  const res = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "deepseek/deepseek-prover-v2:free",
      messages: [
        { role: "system", content: "You are a helpful summarizer." },
        {
          role: "user",
          content: `Summarize this text in simple paragraphs also add Highlights and insights   here is text:\n\n${text}`,
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

  return res.data.choices[0].message.content.trim();
};
