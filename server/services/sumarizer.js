import axios from "axios";

export const summarizeText = async (req, res) => {
  const { text } = req.body;
  const response = await axios.post(
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

  res
    .status(200)
    .json({ summary: response.data.choices[0].message.content.trim() });
};
