// context/TranscriptContext.tsx
import { createContext, useContext, useState } from "react";

const TranscriptContext = createContext(null);

export const TranscriptProvider = ({ children }) => {
  const [transcriptPages, setTranscriptPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  return (
    <TranscriptContext.Provider
      value={{
        transcriptPages,
        setTranscriptPages,
        currentTranscript,
        setCurrentTranscript,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
      }}
    >
      {children}
    </TranscriptContext.Provider>
  );
};

export const useTranscript = () => {
  const context = useContext(TranscriptContext);
  if (!context) {
    throw new Error("useTranscript must be used within a TranscriptProvider");
  }
  return context;
};
