import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { RegisterServiceWorker } from "./RegisterServiceWorker";

const geist = localFont({
  src: "./fonts/geist-latin.woff2",
  weight: "100 900",
  display: "swap",
});

const audiowide = localFont({
  src: "./fonts/audiowide-latin.woff2",
  variable: "--font-audiowide",
  weight: "400",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050302",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://shahincafe.com"),
  title: {
    default: "Shahin Cafe | More Than Just Coffee",
    template: "%s | Shahin Cafe",
  },
  description:
    "Premium coffee, fresh ingredients, and a unique experience. Explore the Shahin Cafe menu.",

  manifest: "/manifest.webmanifest",
  applicationName: "Shahin Cafe",

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Shahin",
  },

  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: ["/icons/icon-192x192.png"],
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shahincafe.com",
    siteName: "Shahin Cafe",
    title: "Shahin Cafe | More Than Just Coffee",
    description: "Premium coffee, fresh ingredients, and a unique experience.",
    images: [
      {
        url: "/images/DesktopHero.png",
        width: 1672,
        height: 941,
        alt: "Shahin Cafe",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Shahin Cafe | More Than Just Coffee",
    description: "Premium coffee, fresh ingredients, and a unique experience.",
    images: ["/images/DesktopHero.png"],
  },

  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.className} ${audiowide.variable} h-full antialiased custom-scrollbar`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[#050302] flex flex-col safe-x" suppressHydrationWarning>
        <RegisterServiceWorker />
        {children}
      </body>
    </html>
  );
}
