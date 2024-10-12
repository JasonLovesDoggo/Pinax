"use client";

import Autoplay from "embla-carousel-autoplay";

import { Button } from "~/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { DefaultTheme, themes, Themes } from "~/app/misc/themes/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export default function ThemeCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [autoplayToast, setAutoplayToast] = useState<string | number>();
  const startIndex = themes.indexOf(DefaultTheme);

  const toggleAutoplay = (): void => {
    if (!api?.plugins()?.autoplay) return;

    const autoplay = api.plugins().autoplay;
    const isPlaying = autoplay.isPlaying();
    if (!isPlaying && autoplayToast === undefined) {
      autoplay.play();
      setAutoplayToast(
        toast("Scrolling through themes...", {
          action: {
            label: "Stop",
            onClick: () => autoplay.stop(),
          },
          duration: Infinity,
        }),
      );
    }
    if (autoplayToast !== undefined) {
      autoplay.stop();
      toast.dismiss(autoplayToast);
      setAutoplayToast(undefined);
    }
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      // api.selectedScrollSnap() returns the RELATIVE index of the selected item, so the below will never be undefined
      const theme: Themes = themes[api.selectedScrollSnap()]!;
      document.body.classList.remove(...themes);
      document.body.classList.add(theme);
    });
  }, [api]);

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        startIndex: startIndex,
      }}
      plugins={[
        Autoplay({
          delay: 1500,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
          playOnInit: false,
        }),
      ]}
      setApi={setApi}
      className="w-32 max-w-xs" /*Dirty fix for the carousel*/
    >
      <CarouselContent className="-ml-1 max-w-fit">
        {themes.map((t) => (
          <CarouselItem key={t} className="flex justify-center cursor-pointer">
            <div className="p-1">
              <span onClick={toggleAutoplay} className="text-xl font-semibold">{t}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
     <div className="flex justify-center">
       <CarouselNext>
         <IconChevronRight />
       </CarouselNext>
       <CarouselPrevious><IconChevronLeft /></CarouselPrevious>
       </div>
    </Carousel>
  );
}
