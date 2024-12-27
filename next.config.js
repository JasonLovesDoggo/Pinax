/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: [process.env.R2_CACHE_DOMAIN],
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.R2_CACHE_DOMAIN,
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.microlink.io", // Microlink Image Preview
        pathname: "**",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/foodle",
        destination: "https://jasoncameron.dev/foodle",
        permanent: true,
      },
    ];
  },
};

export default config;
