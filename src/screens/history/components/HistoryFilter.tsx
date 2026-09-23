"use client";

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
    <div className="animate-fade-up delay-100 relative lg:w-1/2 w-full mb-6">
      <div className="relative bg-state-400/60 backdrop-blur-xl border border-white/5 rounded-2xl py-1.5 px-0.5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full bg-primary-500/5 blur-3xl pointer-events-none" />

        <div className="relative flex items-center gap-[1%] overflow-hidden scrollbar-hide">
          {filters.map((filter) => {
            const isActive = active === filter.key;
            const Icon = filter.icon;
            const count = counts?.[filter.key];

            return (
              <button
                key={filter.key}
                onClick={() => onChange(filter.key)}
                className={`
                  relative flex-shrink-0 flex items-center gap-2
                  py-2.5 rounded-xl
                  transition-colors duration-300
                  overflow-hidden w-[24%] justify-center
                  hover:scale-[1.03] active:scale-[0.97]
                  ${
                    isActive
                      ? "text-state-500"
                      : "text-secondary-400 hover:text-neutral-50"
                  }
                `}
              >
                {isActive && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 shadow-[0_4px_20px_rgba(170,142,119,0.4)] overflow-hidden">
                    {/* Shimmer متحرک روی تب فعال */}
                    <div className="history-shimmer absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  </div>
                )}

                <div
                  className={`
                    relative z-10 transition-transform duration-500
                    ${isActive ? "rotate-[-10deg] scale-110" : "rotate-0 scale-100"}
                  `}
                >
                  <Icon className="w-4 h-4" />
                </div>

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
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
