import { HydrateClient } from "@/trpc/server";
import BentoContainer from "@/components/bento/BentoContainer";

export default async function Home() {
  return (
    <HydrateClient>
      {/*<div className="min-h-screen bg-gradient-to-b from-background to-background/80 p-4">*/}
      {/*  <ResponsiveGridLayout*/}
      {/*    className="layout"*/}
      {/*    layouts={{ lg: layout }}*/}
      {/*    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}*/}
      {/*    cols={{ lg: 4, md: 4, sm: 2, xs: 1, xxs: 1 }}*/}
      {/*    rowHeight={150}*/}
      {/*    isResizable={false}*/}
      {/*  >*/}
      {/*    {Object.entries(ELEMENT_MAP).map(([key, element]) => (*/}
      {/*      <div key={key}>{element}</div>*/}
      {/*    ))}*/}
      {/*  </ResponsiveGridLayout>*/}
      {/*</div>*/}
      <main className="flex min-h-full flex-col items-center justify-center gap-y-4 p-4">
        <div className="flex h-screen w-[80vw] grow gap-x-4 overflow-hidden">
          {" "}
          {/*TODO: REMOVE h-screen IT VBREAKS
         EVERYTHING*/}
          <BentoContainer />
        </div>
      </main>
    </HydrateClient>
  );
}
