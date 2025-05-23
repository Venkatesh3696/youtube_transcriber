import { useGlobalStorage } from "../context/globalState";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { useTranscript } from "@/context/transcriptContext";

const Home = () => {
  const navigate = useNavigate();

  const { youtubeUrl, setYoutubeUrl } = useGlobalStorage();
  const { setTranscriptPages } = useTranscript();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log("submitted", youtubeUrl);

    const { data } = await API.post("/api/transcript/verifyurl", {
      youtubeUrl: youtubeUrl,
    });

    const { videoId } = data;

    if (!videoId) {
      alert("Invalid YouTube URL! please provide a valid one.");
      return;
    }

    const res = await API.post("/api/transcript", { youtubeUrl });
    const { _id } = res.data.summaryData;

    setTranscriptPages(res.data.summaryData.transcriptPages);
    console.log("generated videoid", { videoId, _id });

    navigate(`/summary/${_id}`);
  };

  console.log({ youtubeUrl });

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-5 p-6">
      <div className="text-center">
        <h1>Youtube Summarizer</h1>
        <p>No time to watch full youtube video?</p>
        <p>Genarate transcripts and get summary in seconds</p>
      </div>
      <form
        onSubmit={onSubmitForm}
        className="flex justify-between items-center w-full "
      >
        <input
          className="flex-grow-1 h-10 border-1 border-white p-2"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="paste your your youtube video url here ..."
        />
        <button
          type="submit"
          className="bg-blue-300 rounded-2xl text-black p-2 ml-3 cursor-pointer"
        >
          Generate Summary
        </button>
      </form>
    </div>
  );
};

export default Home;
