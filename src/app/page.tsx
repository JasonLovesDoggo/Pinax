import { HydrateClient } from "@/trpc/server";
import BentoContainer from "@/components/bento/BentoContainer";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-full flex-col items-center justify-center gap-y-4 p-4">
        <h1 className="text-3xl font-bold underline">Hello gang!</h1>
        <p className="py-4">
          <a className="text-pink hover:text-blue/30">Hi Chirag!!!!!!!!!!</a>
        </p>
        <div className="flex h-screen w-[80vw] grow gap-x-4">
          <BentoContainer />
        </div>
      </main>
    </HydrateClient>
  );
}
