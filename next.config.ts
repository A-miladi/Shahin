import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

// ==================== PWA Configuration ====================
const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true,
    disableDevLogs: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts-webfonts",
          expiration: { maxEntries: 4, maxAgeSeconds: 365 * 24 * 60 * 60 },
        },
      },
      {
        urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
        handler: "StaleWhileRevalidate",
        options: { cacheName: "static-font-assets" },
      },
      {
        urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp|avif)$/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "static-image-assets",
          expiration: { maxEntries: 64, maxAgeSeconds: 30 * 24 * 60 * 60 },
        },
      },
      {
        urlPattern: /\/_next\/static\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "next-static",
          expiration: { maxEntries: 200, maxAgeSeconds: 365 * 24 * 60 * 60 },
        },
      },
      {
        urlPattern: /\/_next\/image\?url=.+$/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "next-image",
          expiration: { maxEntries: 64, maxAgeSeconds: 30 * 24 * 60 * 60 },
        },
      },
      {
        urlPattern: /\/api\/.*/i,
        handler: "NetworkFirst",
        method: "GET",
        options: {
          cacheName: "api-cache",
          expiration: { maxEntries: 32, maxAgeSeconds: 24 * 60 * 60 },
          networkTimeoutSeconds: 10,
        },
      },
      {
        urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "cross-origin-images",
          expiration: { maxEntries: 32, maxAgeSeconds: 24 * 60 * 60 },
        },
      },
    ],
  },
});

// ==================== Next.js Configuration ====================
const nextConfig: NextConfig = {
  // 👈 رفع هشدار multiple lockfiles
  turbopack: {
    root: __dirname,
  },

  /* ==================== Image Optimization ==================== */
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  /* ==================== Compiler Options ==================== */
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  /* ==================== Bundle Optimization ==================== */
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  /* ==================== TypeScript ==================== */
  typescript: {
    ignoreBuildErrors: false,
  },
};

// ==================== Export with PWA ====================
export default withPWA(nextConfig);
