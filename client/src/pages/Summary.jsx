import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import API from "../utils/axios.js";
import { useGlobalStorage } from "../context/globalState.jsx";
import YoutubeVideo from "../components/YoutubeVideo.jsx";
import { ClipLoader } from "react-spinners";

const Summary = () => {
  const { videoId } = useParams();

  console.log({ videoId });

  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  let { youtubeUrl } = useGlobalStorage();

  youtubeUrl = youtubeUrl || `https://www.youtube.com/watch?v=${videoId}`;

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await API.post(`/api/summary`, {
          youtubeUrl: youtubeUrl,
        });

        console.log({ data });
        setSummaryData(data?.summaryData);
      } catch (err) {
        console.error("Failed to load summary:", err);
        setLoading(false);
        setSummaryData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [videoId, youtubeUrl]);

  console.log({ summaryData });
  return (
    <div className="w-full flex flex-col p-5">
      <h1 className="text-center text-3xl">Youtube video Summarizer</h1>
      <div className="flex">
        <div className="w-1/2  border-1 gap-2">
          <div className="flex flex-col">
            <YoutubeVideo videoId={videoId} />
            <div className="p-5">
              <h1 className="text-center font-bold text-3xl">Transcript</h1>
              {loading ? (
                <ClipLoader
                  color="#ffffff"
                  loading={loading}
                  size={150}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                  className="z-30 flex justify-center items-center"
                />
              ) : (
                <p>{summaryData.transcript}</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/2 p-4 border-1">
          <h1 className="text-center font-bold text-3xl">Summary</h1>
          {loading ? (
            <ClipLoader
              color="#ffffff"
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
              className="z-30 flex justify-center items-center"
            />
          ) : (
            <ReactMarkdown>{summaryData.summary}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;
