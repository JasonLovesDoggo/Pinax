"use client";
import { motion } from "framer-motion";
import { Site } from "~/config/site";

export const ServerStatus = () => {
  // A pulsing green circle that indicates all systems are running normally.
  return (

    <div>
      <a href={Site.StatusSite} target="_blank" className="flex items-center" aria-label="Server Monitoring Website">
        <motion.div
          className="h-3 w-3 rounded-full bg-green-500 mr-1 "
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-sm">All Systems Operational</span>
    </a>
    </div>
  );
};
