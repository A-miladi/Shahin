import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shahin Cafe",
    short_name: "Shahin",
    description:
      "More Than Just Coffee - Premium coffee and unique experience.",
    id: "/",
    scope: "/",
    start_url: "/",
    display: "standalone",
    background_color: "#050302",
    theme_color: "#050302",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
