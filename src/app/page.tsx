import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-full flex-col items-center justify-center py-2">
        <h1 className="text-3xl font-bold underline">Hello tRPC!</h1>
        <p className="py-4">
          <a className="text-pink hover:text-blue/30">
            Hi Chirag!!!!!!!!!!
          </a>
        </p>
      </main>
    </HydrateClient>
  );
}
