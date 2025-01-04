import { clsx } from "clsx";
import type { ComponentProps } from "react";
import Site from "@/config/site";
import { IconBrandGithub } from "@tabler/icons-react";
import { ServerStatus } from "@/components/widgets/server-status";
import { env } from "@/env";
import Copyright from "@/components/misc/Copyright";

function getLatestCommit() {
  const sha = env.VERCEL_GIT_COMMIT_SHA;
  const label = sha ? sha.slice(0, 7) : "";
  return (
    label && <span className="hidden text-overlay1 sm:inline">#{label}</span>
  );
}

export const Footer = async ({
  className,
  ...props
}: ComponentProps<"footer">) => {
  return (
    <footer
      className={clsx("flex flex-col pt-5 font-medium md:pt-1", className)}
      {...props}
    >
      <hr className="border-primary w-full border-t" />
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

        <Copyright />
        <ServerStatus />
      </div>
    </footer>
  );
};
