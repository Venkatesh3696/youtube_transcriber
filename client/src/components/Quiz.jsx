import { useState } from "react";
import API from "../utils/axios";
import { useTranscript } from "@/context/transcriptContext";

export default function QuizViewer() {
  const [subjective, setSubjective] = useState([]);
  const [objective, setObjective] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currentTranscript } = useTranscript();

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const [objRes, subRes] = await Promise.all([
        API.post("/api/questionary/objective", { text: currentTranscript }),
        API.post("/api/questionary/subjective", { text: currentTranscript }),
      ]);

      console.log(objRes, subRes);
      setObjective(objRes.data.questions);
      setSubjective(subRes.data.questions);
    } catch (err) {
      console.error("Error fetching questions:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between">
        <h1>Generate questions</h1>
        <button
          onClick={fetchQuestions}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
          disabled={loading || !currentTranscript?.trim()}
        >
          {loading ? "Generating..." : "Generate Questions"}
        </button>
      </div>

      {/* Objective Questions  */}
      {objective.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Objective Questions</h2>
          {objective.map((q, i) => (
            <div key={i} className="mb-4">
              <p className="font-medium">
                {i + 1}. {q.question}
              </p>
              <ul className="list-disc pl-5">
                {q.options.map((opt, j) => (
                  <li
                    key={j}
                    className={
                      opt === q.answer ? "text-green-600 font-semibold" : ""
                    }
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Subjective Questions */}
      {subjective.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Subjective Questions</h2>
          {subjective.map((q, i) => (
            <details key={i} className="mb-4 border p-3 rounded">
              <summary className="font-medium">
                {i + 1}. {q.question}
              </summary>
              <p className="mt-2 text-gray-700">{q.answer}</p>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
