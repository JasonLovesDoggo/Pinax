import {defineConfig} from "vite";
import solid from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";
import suidPlugin from "@suid/vite-plugin";

export default defineConfig({
  plugins: [suidPlugin(), solid(), tsconfigPaths()],
  build: {
    target: "esnext",
  },
});
