import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";
import suidPlugin from "@suid/vite-plugin";
import { compression } from "vite-plugin-compression2";
// import analyzer from "vite-bundle-analyzer";

export default defineConfig({
  plugins: [
    suidPlugin(),
    // analyzer(),
    solid(),
    tsconfigPaths(),
    compression({
      algorithm: "gzip",
      exclude: [/\.(br)$ /, /\.(gz)$/],
    }),
    compression({
      algorithm: "brotliCompress",
      exclude: [/\.(br)$ /, /\.(gz)$/],
    }),
  ],
  build: {
    target: "esnext",
  },
});
