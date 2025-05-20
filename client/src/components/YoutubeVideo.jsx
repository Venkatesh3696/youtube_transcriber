const YoutubeVideo = ({ videoId }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  console.log({ embedUrl });
  return (
    <div className="border-red-400 aspect-video p-2">
      <iframe
        title="YouTube Video"
        src={embedUrl}
        allowFullScreen
        className="w-full h-full border-none "
      ></iframe>
    </div>
  );
};

export default YoutubeVideo;
