import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",

        pathname: "/**",
      },
    ],
  },
  /**
   * React strict mode helps catch bugs in development
   * Recommended to keep ON
   */
  reactStrictMode: true,

  /**
   * Enables faster builds and smaller bundles
   * Uses SWC compiler
   */
  // swcMinify: true,

  /**
   * Allow loading images from external domains
   * Add domains you actually use
   */

  /**
   * Environment variables exposed to the browser
   * DO NOT put secrets here
   */
  env: {
    NEXT_PUBLIC_APP_NAME: "My Next App",
  },

  /**
   * Enable experimental features if needed
   * Uncomment only when required
   */
  // experimental: {
  //   serverActions: true,
  // },

  /**
   * Useful when deploying on Vercel / serverless
   */
  output: "standalone",

  /**
   * Custom redirects
   */
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },

  /**
   * Custom headers (security, caching, etc.)
   */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
