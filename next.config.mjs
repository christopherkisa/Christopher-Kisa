// import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  ...(process.env.NODE_ENV === "development" && {
    allowedDevOrigins: [
      "localhost",
      "127.0.0.1",
      "192.168.0.122",
    ],
  }),
};

// if (process.env.NODE_ENV === "development") {
//   await setupDevPlatform();
// }

export default nextConfig;