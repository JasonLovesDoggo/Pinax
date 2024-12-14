"use client";

import { Ref, useCallback, useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { CardContent } from "@/components/ui/card";
import { GlobeInstance } from "globe.gl";
import { useMeasure } from "react-use";
import GridCard from "@/components/cards/default";

const torontoCoordinates = { lat: 43.6532, lng: -79.3832 };

export default function Location() {
  const globeEL = useRef<GlobeInstance>(undefined);
  const [expanded, setExpanded] = useState(false);
  const [globeReady, setGlobeReady] = useState(false);

  const [ref, { width, height }] = useMeasure();

  const toggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  useEffect(() => {
    if (globeEL.current) {
      globeEL.current.pointOfView(torontoCoordinates);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setGlobeReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GridCard
      className={`cursor-pointer overflow-hidden transition-all duration-500 ease-in-out ${
        expanded
          ? "z-590 h-100vh fixed inset-0 w-screen rounded-none"
          : "aspect-square w-full"
      }`}
      ref={ref as Ref<HTMLDivElement>}
      // onClick={toggleExpanded}
    >
      <CardContent className="h-full p-0">
        <div className="relative h-full w-full">
          {globeReady && (
            <Globe
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
              // backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
              backgroundColor="#00000000"
              width={width}
              height={height}
              animateIn={true}
              ref={globeEL}
            />
          )}
          {expanded && (
            <div className="bg-white absolute right-4 top-4 rounded-lg bg-opacity-80 p-3 shadow-lg">
              <span className="text-gray-800 font-semibold">
                Click anywhere to minimize
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </GridCard>
  );
}
