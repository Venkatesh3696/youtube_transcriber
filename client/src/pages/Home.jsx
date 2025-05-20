import { useGlobalStorage } from "../context/globalState";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const { youtubeUrl, setYoutubeUrl } = useGlobalStorage();

  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log("submitted", youtubeUrl);

    const videoId = youtubeUrl.split("watch?v=")[1];

    if (!videoId) {
      alert("Invalid YouTube URL");
      return;
    }
    navigate(`/summary/${videoId}`);
  };

  console.log({ youtubeUrl });

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-5 p-6">
      <div className="text-center">
        <h1>Youtube Summarizer</h1>
        <p>No time to watch full youtube video?</p>
        <p>Genarate transcripts and get summary in seconds</p>
      </div>
      <form onSubmit={onSubmitForm}>
        <input
          className="w-4xl h-10 border-1 border-white p-2"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="paste your your youtube video url here ..."
        />
        <button type="submit" className="bg-blue-300 text-black p-2 ml-3">
          Generate Summary
        </button>
      </form>
    </div>
  );
};

export default Home;
