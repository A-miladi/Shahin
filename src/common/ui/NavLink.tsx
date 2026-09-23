"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiLoader } from "react-icons/fi";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  loadingText?: string;
  onClick?: () => void;
  variant?: "solid" | "glass" | "icon";
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  className = "",
  loadingText,
  onClick,
  variant = "solid",
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoading || isPending) return;

    setIsLoading(true);
    onClick?.();

    startTransition(() => {
      router.push(href);
      // بعد از ۸۰۰ms حالت لودینگ را ریست کن (به عنوان fallback)
      setTimeout(() => setIsLoading(false), 800);
    });
  };

  const isLoadingState = isLoading || isPending;

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`relative overflow-hidden flex items-center justify-center gap-2 transition-all duration-300 ${
        isLoadingState ? "pointer-events-none" : ""
      } ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLoadingState ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <FiLoader className="w-4 h-4" />
            </motion.div>
            {loadingText && (
              <span className="text-xs font-medium whitespace-nowrap">
                {loadingText}
              </span>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoadingState && variant === "icon" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 rounded-xl border-2 border-primary-400/40 border-t-primary-400 pointer-events-none"
            style={{ animation: "spin 1s linear infinite" }}
          />
        )}
      </AnimatePresence>
    </Link>
  );
};
