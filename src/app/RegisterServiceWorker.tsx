"use client";

import { useEffect } from "react";

export function RegisterServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" }).catch((error) => {
      console.error("Could not register Shahin Cafe's service worker.", error);
    });
  }, []);

  return null;
}
