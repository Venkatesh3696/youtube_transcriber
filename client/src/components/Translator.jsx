import React, { useState } from "react";
import API from "@/utils/axios";
import { useTranscript } from "@/context/transcriptContext";

const translationLanguages = [
  {
    language: "telugu",
  },
  {
    language: "hindi",
  },
  {
    language: "kannada",
  },
  {
    language: "tamil",
  },
];

export default function TranslateSection() {
  const [language, setLanguage] = useState(translationLanguages[0].language);
  const [translatedText, setTranslatedText] = useState("");

  const { currentTranscript } = useTranscript();

  const translate = async () => {
    const response = await API.post("/api/translate", {
      targetLang: language,
      text: currentTranscript,
    });
    console.log({ response });
    setTranslatedText(response.data.translatedText);
  };

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-2 ">Translate Transcript</h2>
        <div className="flex ">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="cursor-pointer bg-blue-400 px-4"
          >
            {translationLanguages.map((each) => (
              <option
                key={each.language}
                value={each.language}
                className="bg-blue-400 cursor-pointer"
              >
                {each.language}
              </option>
            ))}
          </select>
          <button
            onClick={translate}
            className="ml-2 p-1 bg-blue-500 text-white rounded cursor-pointer"
          >
            Translate
          </button>
        </div>
      </div>
      <p className="mt-2 whitespace-pre-wrap">{translatedText}</p>
    </div>
  );
}
