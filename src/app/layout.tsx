import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Audiowide, Sofia, Trirong } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/common/layout/Navigation/desktop/Navbar";
import { Footer } from "@/common/layout/footer";
import { BottomTab } from "@/common/layout/Navigation/mobile/BottomTab";
import { ScrollToTop } from "@/utils/ScrollToTop";
import { ToastProvider } from "@/providers/ToastProvider";
import { PaymentProvider } from "@/providers/PaymentProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: "400",
});

const sofia = Sofia({
  variable: "--font-sofia",
  subsets: ["latin"],
  weight: "400",
});

const trirong = Trirong({
  variable: "--font-trirong",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  themeColor: "#0c0c0c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://shahincafe.com"),
  title: {
    default: "Shahin Cafe | More Than Just Coffee",
    template: "%s | Shahin Cafe",
  },
  description:
    "Premium coffee, fresh ingredients, and a unique experience. Order your favorite drinks online.",

  manifest: "/manifest.webmanifest",
  applicationName: "Shahin Cafe",

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Shahin",
    startupImage: ["/icons/apple-splash-2048-2732.png"],
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
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shahin Cafe",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Shahin Cafe | More Than Just Coffee",
    description: "Premium coffee, fresh ingredients, and a unique experience.",
    images: ["/images/og-image.jpg"],
  },

  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${audiowide.variable}
        ${sofia.variable}
        ${trirong.variable}
        h-full antialiased custom-scrollbar
      `}
      suppressHydrationWarning
    >
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Shahin" />

        <meta name="msapplication-TileColor" content="#0c0c0c" />
        <meta name="msapplication-tap-highlight" content="no" />

        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-full bg-black flex flex-col safe-x">
        <ScrollToTop />
        <ToastProvider />
        <PaymentProvider>
          <Navbar />
          {children}
          <Footer />
          <BottomTab />
        </PaymentProvider>
      </body>
    </html>
  );
}
