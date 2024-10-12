import noise from "~/public/noise.png";

const BackgroundNoise = () => {
  return (
    <div className="absolute inset-0 z-5000">
    <div
      className="opacity-[0.075] w-full min-h-full	bg-[length:128px] pointer-events-none"
      style={{
        backgroundImage: `url(${noise.src})`,
      }}
    />
    </div>
  );
};

export default BackgroundNoise;
