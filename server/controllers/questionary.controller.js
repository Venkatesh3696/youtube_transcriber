import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const generateSubjectiveQuestions = async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-prover-v2:free",
        messages: [
          {
            role: "system",
            content:
              "You are an educational assistant that only returns JSON arrays of questions and answers from academic text. Do not use markdown or code blocks.",
          },
          {
            role: "user",
            content: `Generate 5 subjective questions based on the following transcript.

            Each object must have:
            - "question": a string
            - "answer": a string

            Return only the JSON array. No markdown, no formatting, no explanation.

            Text:\n\n${text}`,
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

    let raw = response.data.choices[0].message.content.trim();

    // Remove ```json ... ``` wrappers if present
    if (raw.startsWith("```json")) {
      raw = raw
        .replace(/```json\s*/, "")
        .replace(/```$/, "")
        .trim();
    }

    const questions = JSON.parse(raw);

    res.status(200).json({ questions });
  } catch (error) {
    console.error(
      "❌ Error generating subjective questions:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to generate questions." });
  }
};

export const generateObjectiveQuestions = async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-prover-v2:free",
        messages: [
          {
            role: "system",
            content:
              "You are an assistant that returns pure JSON for javascript. Do not use markdown or code blocks.",
          },
          {
            role: "user",
            content: `Generate 4 objective questions based on this text.

            Each item must have:
            - "question": a string
            - "options": an array of 4 strings
            - "answer": the correct option string

            Return only the JSON array — no markdown, no explanation, no formatting.

            Text:\n\n${text}`,
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

    let raw = response.data.choices[0].message.content.trim();

    if (raw.startsWith("```json")) {
      raw = raw
        .replace(/```json\s*/, "")
        .replace(/```$/, "")
        .trim();
    }

    const questions = JSON.parse(raw);

    res.status(200).json({ questions });
  } catch (error) {
    console.error(
      "❌ Error generating objective questions:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to generate questions." });
  }
};
