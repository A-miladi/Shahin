"use client";

import { useEffect, useState } from "react";

export const LoadingBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2200);

    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed left-0 right-0 z-[9999] h-[2px] bg-transparent
        ${isFadingOut ? "animate-loading-fade-out" : ""}
      `}
      style={{
        top: "env(safe-area-inset-top, 0px)",
      }}
    >
      <div className="animate-loading-fill relative h-full bg-gradient-to-r from-primary-600 via-primary-400 to-primary-600 shadow-[0_0_10px_rgba(170,142,119,0.6)]">
        <div className="animate-loading-shimmer absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      </div>
    </div>
  );
};
