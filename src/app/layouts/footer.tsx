import { clsx } from "clsx";
import type { ComponentProps } from "react";
import { Site } from "~/config/site";
import { IconBrandGithub } from "@tabler/icons-react";
import { ServerStatus } from "~/app/misc/widgets/server-status";

function getLatestCommit() {
  const sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  const label = sha ? sha.slice(0, 7) : "";
  return label && <span className="hidden text-text sm:inline">#{label}</span>;
}

export const Footer = ({ className, ...props }: ComponentProps<"footer">) => {
  const year = String(new Date().getFullYear());

  return (
    <footer
      className={clsx(
        "flex flex-col pt-5 font-medium text-zinc-700 dark:text-zinc-100 md:pt-1",
        className,
      )}
      {...props}
    >
      <hr className="border-zinc-150 w-full border-t dark:border-zinc-800" />
      <div className="flex flex-col flex-wrap items-center justify-between gap-2 pt-2 sm:flex-row">
        <a
          className="link inline-flex items-center gap-1.5"
          href={Site.github}
          rel="noreferrer"
          target="_blank"
        >
          <IconBrandGithub className="translate-y-px" />
          <span>
            <span>{Site.domain}</span>
            {getLatestCommit()}
          </span>
        </a>

        <span className="text-zinc-350 dark:text-[#898992]">
          ©{" "}
          <time className="hidden sm:inline" dateTime={String(year)}>
            {year}{" "}
          </time>
          {Site.author}
        </span>
        <ServerStatus />
      </div>
    </footer>
  );
};
