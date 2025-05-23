import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import TranscriptPage from "./pages/TranscriptPage";

function App() {
  return (
    <div className="w-screen min-h-screen bg-gray-900 text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summary/:summaryid" element={<TranscriptPage />} />
      </Routes>
    </div>
  );
}

export default App;
