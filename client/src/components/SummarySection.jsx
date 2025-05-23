import { useState } from "react";
import { Button } from "./ui/button";
import { useTranscript } from "@/context/transcriptContext";
import API from "@/utils/axios";

const SummarizerSection = () => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { currentTranscript } = useTranscript();

  const handleSummarize = async () => {
    setLoading(true);
    setSummary("");
    setError("");

    try {
      const response = await API.post("/api/summary", {
        text: currentTranscript,
      });

      const { data } = response;
      console.log({ response });

      setSummary(data.summary);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-2xl shadow space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Summarizer</h2>
        <Button
          onClick={handleSummarize}
          disabled={loading}
          className="cursor-pointer bg-blue-500"
        >
          {loading ? "Summarizing..." : "Generate Summary"}
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {summary && (
        <textarea
          value={summary}
          readOnly
          className="w-full h-60 resize-none"
        />
      )}
    </div>
  );
};

export default SummarizerSection;
