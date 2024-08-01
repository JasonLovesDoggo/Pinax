import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";
import suidPlugin from "@suid/vite-plugin";
import pluginPurgeCss from "@mojojoejo/vite-plugin-purgecss";
import Icons from "unplugin-icons/vite";

import analyzer from "vite-bundle-analyzer";

export default defineConfig({
  plugins: [
    Icons({
      compiler: "solid",
    }),
    suidPlugin(),
    analyzer(),
    pluginPurgeCss({
      variables: true,
    }),
    solid(),
    tsconfigPaths(),
  ],
  build: {
    target: "esnext",
    minify: "terser",
  },
});
