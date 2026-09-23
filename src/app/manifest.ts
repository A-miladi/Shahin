import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shahin Cafe",
    short_name: "Shahin",
    description:
      "More Than Just Coffee - Premium coffee and unique experience.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0c0c", // رنگ پس‌زمینه (state-500)
    theme_color: "#aa8e77", // رنگ تم (primary-500)
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192x192.png", // مسیر آیکون ۱۹۲x۱۹۲
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png", // مسیر آیکون ۵۱۲x۵۱۲
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
