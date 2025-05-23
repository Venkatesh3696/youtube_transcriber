// app/transcript/page.tsx or any route
import TranscriptSection from "../components/Transcript";
import TranslateSection from "../components/Translator";
import QuizViewer from "../components/Quiz";
import YouTubeInput from "../components/UrlInput";
import SummarizerSection from "@/components/SummarySection";

const TranscriptPage = () => {
  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Transcript Processor</h1>

      <TranscriptSection />

      <SummarizerSection />

      <TranslateSection />

      <QuizViewer />
    </div>
  );
};

export default TranscriptPage;
