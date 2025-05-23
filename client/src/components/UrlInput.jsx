import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import API from "@/utils/axios";
import { useTranscript } from "@/context/transcriptContext";

const YouTubeInput = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    setTranscriptPages,
    setTotalPages,
    setCurrentPage,
    setCurrentTranscript,
  } = useTranscript();

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/api/transcript", {
        youtubeUrl,
      });
      setTranscriptPages(data.pages);
      setTotalPages(data.pages.length);
      setCurrentTranscript(data.pages[0]);
      setCurrentPage(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-2xl shadow space-y-4">
      <h2 className="text-xl font-semibold">YouTube Transcript Generator</h2>
      <div className="flex gap-2">
        <Input
          type="url"
          placeholder="Enter YouTube video URL"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Fetching..." : "Get Transcript"}
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default YouTubeInput;
