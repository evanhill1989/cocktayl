const DebugVideo = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <video
        src="/videos/output.mp4"
        controls
        muted
        playsInline
        preload="auto"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default DebugVideo;
