import { useTranscript } from "@/context/transcriptContext";
import API from "@/utils/axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TranscriptSection() {
  const [isEditing, setIsEditing] = useState(false);
  const { setTranscriptPages } = useTranscript();

  const {
    transcriptPages,
    setCurrentTranscript,
    currentTranscript,
    currentPage,
    setCurrentPage,
  } = useTranscript();

  const { summaryid } = useParams();

  const handleEdit = async (value) => {
    const updated = [...transcriptPages];
    updated[currentPage] = value;
    setTranscriptPages(updated);
    setCurrentTranscript(value);
    await API.post("/api/transcript/edit", {
      transcriptPages: setTranscriptPages,
    });
  };

  const onClickNext = () => {
    if (currentPage < transcriptPages.length - 1) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      setCurrentTranscript(transcriptPages[nextPage]);
    }
  };

  const onClickPrev = () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      setCurrentTranscript(transcriptPages[prevPage]);
    }
  };

  console.log({ transcriptPages, currentTranscript, currentPage });

  useEffect(() => {
    console.log({ summaryid });
    const fecthData = async () => {
      const response = await API.get(`/api/transcript?summaryid=${summaryid}`);
      const pages = response.data.summaryData.transcriptPages;

      setTranscriptPages(pages);
      setCurrentPage(0);
      setCurrentTranscript(pages[0]);
    };
    fecthData();
  }, [summaryid, setTranscriptPages, setCurrentTranscript, setCurrentPage]);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Transcript</h2>
        <button
          className="text-sm px-4 p-2 rounded-xs bg-blue-500 cursor-pointer"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <div className="mb-2">
        {currentTranscript ? (
          isEditing ? (
            <textarea
              className="w-full h-80 p-2 border rounded"
              value={currentTranscript}
              onChange={(e) => handleEdit(e.target.value)}
            />
          ) : (
            <p>{currentTranscript}</p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="flex justify-between mt-4">
        <button
          className="cursor-pointer bg-blue-500 px-4 p-2 rounded-2xl"
          onClick={onClickPrev}
          disabled={currentPage === 0}
        >
          Previous
        </button>

        <h1>Page: {currentPage + 1}</h1>

        <button
          className="cursor-pointer bg-blue-500 px-4 p-2 rounded-2xl"
          onClick={onClickNext}
          disabled={currentPage >= transcriptPages.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
