"use client";

import Image from "next/image";
import {
  FiChevronRight,
  FiCheck,
  FiX,
  FiClock,
  FiMoreHorizontal,
} from "react-icons/fi";
import { HistoryItemData } from "@/types/history";

interface HistoryItemProps {
  order: HistoryItemData;
  onClick?: (order: HistoryItemData) => void;
  index: number;
}

const statusConfig = {
  completed: {
    label: "Completed",
    pLabel: "تکمیل شده",
    icon: FiCheck,
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/30",
    glow: "shadow-[0_0_15px_rgba(74,222,128,0.3)]",
    dotColor: "bg-green-400",
  },
  cancelled: {
    label: "Cancelled",
    pLabel: "لغو شده",
    icon: FiX,
    color: "text-special-300",
    bg: "bg-special-300/10",
    border: "border-special-300/30",
    glow: "shadow-[0_0_15px_rgba(201,74,66,0.3)]",
    dotColor: "bg-special-300",
  },
  preparing: {
    label: "Preparing",
    pLabel: "در حال آماده‌سازی",
    icon: FiClock,
    color: "text-primary-400",
    bg: "bg-primary-400/10",
    border: "border-primary-400/30",
    glow: "shadow-[0_0_15px_rgba(191,166,145,0.3)]",
    dotColor: "bg-primary-400",
  },
};

export const HistoryItem: React.FC<HistoryItemProps> = ({
  order,
  onClick,
  index,
}) => {
  const status = statusConfig[order.status];
  const StatusIcon = status.icon;
  const totalItems = order.items.reduce((sum, i) => sum + i.quantity, 0);
  const mainItem = order.items[0];

  return (
    <div
      onClick={() => onClick?.(order)}
      className="animate-fade-up group relative cursor-pointer"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="relative bg-state-400 border border-white/5 group-hover:border-primary-500/30 rounded-3xl overflow-hidden transition-colors duration-500">
        {/* پترن نقطه‌ای */}
        <div
          className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #cfbdac 1px, transparent 1px)",
            backgroundSize: "8px 8px",
          }}
        />

        <div className="relative flex items-stretch">
          {/* ==================== تصویر ==================== */}
          <div className="relative w-32 flex-shrink-0 bg-gradient-to-br from-state-500 to-state-400 flex items-center justify-center overflow-hidden">
            <div className="absolute left-0 z-10 top-1/2 -translate-y-1/2 w-[2px] h-1/2 rounded-r-full bg-gradient-to-b from-transparent via-primary-500 to-transparent" />

            <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              <Image
                src={mainItem.image}
                alt={mainItem.name}
                fill
                className="object-fill drop-shadow-2xl"
                sizes="80px"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <div className="w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {/* ==================== اطلاعات ==================== */}
          <div className="flex-1 min-w-0 p-4 md:p-5">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[10px] font-mono text-secondary-500 uppercase tracking-widest">
                {order.orderNumber}
              </span>
              <span className="w-1 h-1 rounded-full bg-secondary-700" />

              <div
                className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${status.bg} ${status.border} border ${status.color} ${status.glow}`}
              >
                <div
                  className={`
                    ${order.status === "preparing" ? "animate-spin-slow" : ""}
                    ${order.status === "completed" ? "animate-pulse-soft" : ""}
                  `}
                >
                  <StatusIcon className="w-3 h-3" />
                </div>
                <span>{status.label}</span>
              </div>
            </div>

            <h3 className="text-sm md:text-base font-medium text-neutral-50 mb-2 line-clamp-1 group-hover:text-primary-300 transition-colors duration-300">
              {order.items.map((i) => i.name).join(" • ")}
            </h3>

            <div className="flex items-center gap-2 text-[11px] text-secondary-500 flex-wrap">
              <span className="flex items-center gap-1">
                <span className={`w-1 h-1 rounded-full ${status.dotColor}`} />
                {order.date}
              </span>
              <span className="text-secondary-700">•</span>
              <span>{order.time}</span>
              <span className="text-secondary-700">•</span>
              <span>
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.02] border border-white/5">
              <span className="text-[9px] text-secondary-600" dir="rtl">
                {order.pDate}
              </span>
            </div>
          </div>

          {/* ==================== قیمت + فلش ==================== */}
          <div className="flex flex-col items-end justify-between p-4 md:p-5 flex-shrink-0">
            <button
              onClick={(e) => e.stopPropagation()}
              className="w-6 h-6 flex items-center justify-center rounded-full text-secondary-600 hover:text-primary-400 hover:rotate-90 hover:scale-110 transition-all duration-300"
            >
              <FiMoreHorizontal className="w-4 h-4" />
            </button>

            <div className="flex flex-col items-end">
              <div className="relative overflow-hidden">
                <span className="relative z-10 text-base md:text-lg font-bold text-primary-400 whitespace-nowrap">
                  {order.total.toLocaleString()}
                </span>
              </div>
              <span className="text-[9px] text-secondary-500 uppercase tracking-widest">
                Toman
              </span>
            </div>

            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-primary-500 group-hover:translate-x-1 transition-all duration-300">
              <FiChevronRight className="w-3.5 h-3.5 text-secondary-400 group-hover:text-state-500 transition-colors" />
            </div>
          </div>
        </div>

        {/* ==================== آواتارها ==================== */}
        {order.items.length > 1 && (
          <div className="relative px-4 md:px-5 pb-4 pt-3 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex items-center -space-x-2">
                {order.items.slice(0, 4).map((item, i) => (
                  <div
                    key={item.id}
                    className="relative w-9 h-9 rounded-full overflow-hidden bg-state-500 border-2 border-state-400 hover:border-primary-500 hover:scale-110 hover:-translate-y-1 hover:z-10 transition-all duration-300 cursor-pointer"
                    style={{ zIndex: 4 - i }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                      sizes="36px"
                    />
                  </div>
                ))}
                {order.items.length > 4 && (
                  <div className="relative w-9 h-9 rounded-full bg-state-500 border-2 border-state-400 flex items-center justify-center text-[10px] text-secondary-400 font-bold">
                    +{order.items.length - 4}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 ml-auto text-[10px] text-secondary-500 group-hover:text-primary-400 transition-colors">
                <span>View Details</span>
                <span className="text-secondary-600">/ جزئیات</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
