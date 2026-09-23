"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiHome, BiReceipt, BiTimeFive } from "react-icons/bi";
import type { IconType } from "react-icons";

interface TabItem {
  key: string;
  label: string;
  href: string;
  icon: IconType;
}

const TABS: TabItem[] = [
  { key: "order", label: "Order", href: "/order", icon: BiReceipt },
  { key: "home", label: "Home", href: "/", icon: BiHome },
  { key: "history", label: "History", href: "/history", icon: BiTimeFive },
];

export const BottomTab = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [pendingTab, setPendingTab] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleNavigation = (e: React.MouseEvent, href: string, key: string) => {
    e.preventDefault();
    setPendingTab(key);

    startTransition(() => {
      router.push(href);
      setTimeout(() => setPendingTab(null), 500);
    });
  };

  return (
    <nav
      className="
        fixed bottom-0 inset-x-0 z-50
        lg:hidden
        px-4 pb-4 pt-2
        pointer-events-none
      "
    >
      <div
        className="
          pointer-events-auto
          mx-auto max-w-md
          flex items-center justify-around
          h-16
          rounded-2xl
          bg-white/5
          backdrop-blur-xl
          border border-primary-300/10
          shadow-lg shadow-black/20
          relative overflow-hidden
        "
      >
        <AnimatePresence>
          {isPending && (
            <motion.div
              initial={{ width: "0%", opacity: 1 }}
              animate={{ width: "100%", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute top-0 left-0 right-0 h-[1px] z-20"
            >
              <div className="w-full h-full bg-gradient-to-r from-primary-600 via-primary-400 to-primary-600 shadow-[0_0_10px_rgba(170,142,119,0.6)]" />
            </motion.div>
          )}
        </AnimatePresence>

        {TABS.map((tab) => {
          const isActive =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);

          const isTabLoading = isPending && pendingTab === tab.key;

          const Icon = tab.icon;

          return (
            <Link
              key={tab.key}
              href={tab.href}
              aria-label={tab.label}
              onClick={(e) => handleNavigation(e, tab.href, tab.key)}
              className="
                relative flex flex-col items-center justify-center gap-1
                flex-1 h-full
                select-none
                transition-colors duration-200
              "
            >
              <span
                className={`
                  absolute inset-1 rounded-xl
                  transition-all duration-300
                  ${isActive ? "bg-gradient-to-br from-primary-400/5 to-primary-500/5 via-primary-400/15" : "bg-transparent"}
                `}
              />

              <motion.div
                animate={isTabLoading ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  isTabLoading
                    ? { duration: 1, repeat: Infinity, ease: "linear" }
                    : { duration: 0.3 }
                }
                className="relative z-10"
              >
                <Icon
                  size={22}
                  className={`
                    transition-colors duration-200
                    ${
                      isActive || isTabLoading
                        ? "text-primary-400"
                        : "text-neutral-400"
                    }
                  `}
                />
              </motion.div>

              <span
                className={`
                  relative z-10 text-[11px] font-medium
                  transition-colors duration-200
                  ${
                    isActive || isTabLoading
                      ? "text-primary-400"
                      : "text-neutral-400"
                  }
                `}
              >
                {tab.label}
              </span>

              <AnimatePresence>
                {isTabLoading && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute bottom-1 w-1 h-1 rounded-full bg-primary-400"
                  />
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
