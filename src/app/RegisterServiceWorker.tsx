"use client";

import { useEffect, useRef, useState } from "react";

export function RegisterServiceWorker() {
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);
  const [updating, setUpdating] = useState(false);
  const requestedUpdate = useRef(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;

    const serviceWorker = navigator.serviceWorker;
    const listeners = new AbortController();
    const { signal } = listeners;

    serviceWorker.addEventListener("controllerchange", () => {
      setWaiting(null);
      if (requestedUpdate.current) window.location.reload();
    }, { signal });

    serviceWorker.register("/sw.js", { updateViaCache: "none" })
      .then((registration) => {
        if (signal.aborted) return;

        const showUpdate = () => {
          setWaiting(serviceWorker.controller ? registration.waiting : null);
        };
        const watchInstall = () => {
          registration.installing?.addEventListener("statechange", showUpdate, { signal });
        };

        registration.addEventListener("updatefound", watchInstall, { signal });
        watchInstall();
        showUpdate();

        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible") {
            void registration.update().catch(() => {});
          }
        }, { signal });
      })
      .catch((error) => {
        console.error("Could not register Shahin Cafe's service worker.", error);
      });

    return () => listeners.abort();
  }, []);

  if (!waiting) return null;

  return (
    <aside
      lang="fa"
      dir="rtl"
      aria-label="به‌روزرسانی منو"
      className="fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-50 mx-auto flex max-w-sm flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#d4aa60]/40 bg-[#211710] px-4 py-3 text-sm text-[#f4eee3] shadow-lg"
    >
      <span role="status">{updating ? "در حال به‌روزرسانی…" : "نسخهٔ جدید منو آماده است."}</span>
      <button
        type="button"
        disabled={updating}
        className="rounded-lg bg-[#d4aa60] px-3 py-2 font-medium text-[#241610] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4eee3] disabled:opacity-60"
        onClick={() => {
          requestedUpdate.current = true;
          setUpdating(true);
          waiting.postMessage("SKIP_WAITING");
        }}
      >
        به‌روزرسانی
      </button>
    </aside>
  );
}
