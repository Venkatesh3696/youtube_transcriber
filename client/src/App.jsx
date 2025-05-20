import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Summary from "./pages/Summary";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-screen min-h-screen bg-gray-900 text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summary/:videoId" element={<Summary />} />
      </Routes>
    </div>
  );
}

export default App;
