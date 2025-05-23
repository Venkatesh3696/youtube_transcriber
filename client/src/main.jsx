import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import { GlobalProvider } from "./context/globalState.jsx";
import { TranscriptProvider } from "./context/transcriptContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <TranscriptProvider>
          <App />
        </TranscriptProvider>
      </GlobalProvider>
    </BrowserRouter>
  </StrictMode>
);
