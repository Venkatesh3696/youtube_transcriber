import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [summaryData, setSummaryData] = useState(null);

  return (
    <GlobalContext.Provider
      value={{ youtubeUrl, setYoutubeUrl, summaryData, setSummaryData }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalStorage = () => useContext(GlobalContext);

export default GlobalProvider;
