import noise from "@/public/noise.png";

const BackgroundNoise = () => {
  return (
    <div className="z-2000 pointer-events-none absolute inset-0 opacity-[0.075]">
      <div
        className="h-full w-full bg-[length:128px] bg-center bg-repeat"
        style={{
          backgroundImage: `url(${noise.src})`,
        }}
      />
    </div>
  );
};

export default BackgroundNoise;
