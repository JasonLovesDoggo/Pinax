import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import GridCard from "@/components/cards/default";
import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  SiAstro,
  SiCaddy,
  SiCelery,
  SiCloudflare,
  SiDjango,
  SiDocker,
  SiFastapi,
  SiFishshell,
  SiFlask,
  SiGin,
  SiGit,
  SiGithubactions,
  SiGnubash,
  SiGo,
  SiHtml5,
  SiLinux,
  SiLinuxfoundation,
  SiMongodb,
  SiNginx,
  SiNim,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiRedis,
  SiSass,
  SiSqlite,
  SiSvelte,
  SiTailscale,
  SiTraefikproxy,
  SiTypescript,
  SiWireguard,
} from "react-icons/si";
import { FaDatabase } from "react-icons/fa";
import { DiJava } from "react-icons/di";

interface TooltipIconProps {
  tooltip: string;
  icon: ReactNode;
}

const TooltipIcon = ({ tooltip, icon }: TooltipIconProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger className="p-2">
        <div className="flex h-8 w-8 items-center justify-center">{icon}</div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const SkillsTabContent = ({
  children,
  value,
}: {
  children: ReactNode;
  value: string;
}) => (
  <TabsContent value={value} className="mt-0 h-full">
    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {children}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  </TabsContent>
);

export default function Skills() {
  return (
    <GridCard className="relative flex-col items-center justify-center overflow-hidden">
      <Tabs defaultValue="languages" className="h-full w-full">
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList
            className="bg-background inline-flex w-max border-b"
            aria-label="Tab selector for skills"
          >
            <TabsTrigger value="languages">Languages</TabsTrigger>
            <TabsTrigger value="devops">DevOps</TabsTrigger>
            <TabsTrigger value="tools">Tools & Frameworks</TabsTrigger>
            <TabsTrigger value="databases">Databases</TabsTrigger>
            <TabsTrigger value="specializations">Specializations</TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <div className="w-full flex-1">
          <SkillsTabContent value="languages">
            <TooltipIcon tooltip="Python" icon={<SiPython />} />
            <TooltipIcon tooltip="Golang" icon={<SiGo />} />
            <TooltipIcon tooltip="Java" icon={<DiJava />} />
            <TooltipIcon
              tooltip="JavaScript/TypeScript"
              icon={<SiTypescript />}
            />
            <TooltipIcon tooltip="Bash" icon={<SiGnubash />} />
            <TooltipIcon tooltip="Fish" icon={<SiFishshell />} />
            <TooltipIcon tooltip="Nim" icon={<SiNim />} />
            <TooltipIcon tooltip="HTML" icon={<SiHtml5 />} />
            <TooltipIcon tooltip="CSS/SCSS" icon={<SiSass />} />
          </SkillsTabContent>
          <SkillsTabContent value="devops">
            <TooltipIcon tooltip="Linux" icon={<SiLinux />} />
            <TooltipIcon tooltip="Caddy" icon={<SiCaddy />} />
            <TooltipIcon tooltip="Nginx" icon={<SiNginx />} />
            <TooltipIcon tooltip="Traefik" icon={<SiTraefikproxy />} />
            <TooltipIcon tooltip="Docker" icon={<SiDocker />} />
            <TooltipIcon tooltip="Cloudflare" icon={<SiCloudflare />} />
            <TooltipIcon tooltip="WireGuard" icon={<SiWireguard />} />
            <TooltipIcon tooltip="GitHub Actions" icon={<SiGithubactions />} />
          </SkillsTabContent>
          <SkillsTabContent value="tools">
            <TooltipIcon tooltip="Django" icon={<SiDjango />} />
            <TooltipIcon tooltip="FastAPI" icon={<SiFastapi />} />
            <TooltipIcon tooltip="Flask" icon={<SiFlask />} />
            <TooltipIcon tooltip="React" icon={<SiReact />} />
            <TooltipIcon tooltip="Svelte" icon={<SiSvelte />} />
            <TooltipIcon tooltip="Astro" icon={<SiAstro />} />
            <TooltipIcon tooltip="Gin" icon={<SiGin />} />
            <TooltipIcon tooltip="Celery" icon={<SiCelery />} />
            <TooltipIcon tooltip="Postman" icon={<SiPostman />} />
            <TooltipIcon tooltip="Tailscale" icon={<SiTailscale />} />
            <TooltipIcon tooltip="Git" icon={<SiGit />} />
          </SkillsTabContent>
          <SkillsTabContent value="databases">
            <TooltipIcon
              tooltip="PostgreSQL (PostGIS)"
              icon={<SiPostgresql />}
            />
            <TooltipIcon tooltip="SQLite" icon={<SiSqlite />} />
            <TooltipIcon tooltip="RocksDB" icon={<FaDatabase />} />
            <TooltipIcon tooltip="Valkey" icon={<SiLinuxfoundation />} />
            <TooltipIcon tooltip="Redis" icon={<SiRedis />} />
            <TooltipIcon tooltip="MongoDB" icon={<SiMongodb />} />
          </SkillsTabContent>
          <SkillsTabContent value="specializations">
            <TooltipIcon
              tooltip="Backend Web Development"
              icon={<SiDjango />}
            />
            <TooltipIcon tooltip="DevOps" icon={<SiDocker />} />
            <TooltipIcon tooltip="System Administration" icon={<SiLinux />} />
            <TooltipIcon tooltip="Linux Hardening" icon={<SiLinux />} />
          </SkillsTabContent>
        </div>
      </Tabs>
    </GridCard>
  );
}
