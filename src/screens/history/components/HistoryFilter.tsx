"use client";

import { motion } from "framer-motion";
import { FiGrid, FiCoffee, FiPackage, FiGift } from "react-icons/fi";
import type { IconType } from "react-icons";
import { OrderFilterCategory } from "@/types/history";

interface HistoryFilterProps {
  active: OrderFilterCategory;
  onChange: (value: OrderFilterCategory) => void;
  counts?: Record<OrderFilterCategory, number>;
}

interface FilterItem {
  key: OrderFilterCategory;
  label: string;
  pLabel: string;
  icon: IconType;
}

const filters: FilterItem[] = [
  { key: "All", label: "All", pLabel: "همه", icon: FiGrid },
  { key: "Coffee", label: "Coffee", pLabel: "قهوه", icon: FiCoffee },
  { key: "Food", label: "Food", pLabel: "غذا", icon: FiPackage },
  { key: "Snacks", label: "Snacks", pLabel: "میان‌وعده", icon: FiGift },
];

export const HistoryFilter: React.FC<HistoryFilterProps> = ({
  active,
  onChange,
  counts,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative lg:w-1/2 w-full mb-6"
    >
      <div className="relative bg-state-400/60 backdrop-blur-xl border border-white/5 rounded-2xl py-1.5 px-0.5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full bg-primary-500/5 blur-3xl pointer-events-none" />

        <div className="relative flex items-center gap-[1%] overflow-hidden scrollbar-hide">
          {filters.map((filter) => {
            const isActive = active === filter.key;
            const Icon = filter.icon;
            const count = counts?.[filter.key];

            return (
              <motion.button
                key={filter.key}
                onClick={() => onChange(filter.key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`
    relative flex-shrink-0 flex items-center gap-2
     py-2.5 rounded-xl
    transition-colors duration-300
    overflow-hidden w-[24%] justify-center
    ${isActive ? "text-state-500" : "text-secondary-400 hover:text-neutral-50"}
  `}
              >
                {isActive && (
                  <motion.div
                    layoutId="history-filter-bg"
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 shadow-[0_4px_20px_rgba(170,142,119,0.4)] overflow-hidden"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      mass: 0.8,
                    }}
                  >
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 1.5,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-white/15 to-transparent"
                    />
                  </motion.div>
                )}

                <motion.div
                  animate={
                    isActive ? { rotate: [0, -10, 10, 0] } : { rotate: 0 }
                  }
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  <Icon className="w-4 h-4" />
                </motion.div>

                <div className="relative z-10 flex items-center gap-2">
                  <span className="text-sm font-medium whitespace-nowrap">
                    {filter.label}
                  </span>

                  <span
                    className={`hidden md:inline text-[10px] ${
                      isActive ? "text-state-500/70" : "text-secondary-600"
                    }`}
                    dir="rtl"
                  >
                    {filter.pLabel}
                  </span>
                </div>

                {count !== undefined && (
                  <span
                    className={`
                      relative z-10 flex items-center justify-center
                      min-w-[20px] h-5 px-1.5 rounded-full
                      text-[10px] font-bold
                      ${
                        isActive
                          ? "bg-state-500/20 text-state-500"
                          : "bg-white/5 text-secondary-500"
                      }
                    `}
                  >
                    {count}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
