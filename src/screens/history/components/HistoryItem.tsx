"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronRight,
  FiCheck,
  FiX,
  FiClock,
  FiMoreHorizontal,
} from "react-icons/fi";
import { HistoryItemData } from "@/types/history";
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);
  const status = statusConfig[order.status];
  const StatusIcon = status.icon;
  const totalItems = order.items.reduce((sum, i) => sum + i.quantity, 0);
  const mainItem = order.items[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onClick?.(order)}
      className="group relative cursor-pointer"
    >
      <motion.div
        className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, rgba(191,166,145,0.6), rgba(170,142,119,0.1), rgba(191,166,145,0.6))",
        }}
        animate={
          isHovered ? { backgroundPosition: ["0% 0%", "100% 100%"] } : {}
        }
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="relative bg-state-400 border border-white/5 group-hover:border-transparent rounded-3xl overflow-hidden transition-colors duration-500">
        <div
          className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #cfbdac 1px, transparent 1px)",
            backgroundSize: "8px 8px",
          }}
        />

        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          animate={
            isHovered
              ? {
                  background: [
                    "radial-gradient(400px circle at 0% 0%, rgba(191,166,145,0.08), transparent 40%)",
                    "radial-gradient(400px circle at 100% 100%, rgba(191,166,145,0.08), transparent 40%)",
                  ],
                }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />

        <div className="relative flex items-stretch">
          <div className="relative w-32 flex-shrink-0 bg-gradient-to-br from-state-500 to-state-400 flex items-center justify-center overflow-hidden">
            <div className="absolute left-0 z-10 top-1/2 -translate-y-1/2 w-[2px] h-1/2 rounded-r-full bg-gradient-to-b from-transparent via-primary-500 to-transparent" />

            <motion.div
              animate={
                isHovered ? { scale: 1.1, rotate: 3 } : { scale: 1, rotate: 0 }
              }
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={mainItem.image}
                alt={mainItem.name}
                fill
                className="object-fill drop-shadow-2xl"
                sizes="80px"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <div className="w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          <div className="flex-1 min-w-0 p-4 md:p-5">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[10px] font-mono text-secondary-500 uppercase tracking-widest">
                {order.orderNumber}
              </span>
              <span className="w-1 h-1 rounded-full bg-secondary-700" />

              <div
                className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${status.bg} ${status.border} border ${status.color} ${status.glow}`}
              >
                <motion.div
                  animate={
                    order.status === "preparing"
                      ? { rotate: 360 }
                      : order.status === "completed"
                        ? { scale: [1, 1.2, 1] }
                        : { x: [0, -2, 2, 0] }
                  }
                  transition={{
                    duration: order.status === "preparing" ? 2 : 0.5,
                    repeat: order.status === "preparing" ? Infinity : 0,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                >
                  <StatusIcon className="w-3 h-3" />
                </motion.div>
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

          <div className="flex flex-col items-end justify-between p-4 md:p-5 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              onClick={(e) => e.stopPropagation()}
              className="w-6 h-6 flex items-center justify-center rounded-full text-secondary-600 hover:text-primary-400 transition-colors"
            >
              <FiMoreHorizontal className="w-4 h-4" />
            </motion.button>

            <div className="flex flex-col items-end">
              <div className="relative overflow-hidden">
                <span className="relative z-10 text-base md:text-lg font-bold text-primary-400 whitespace-nowrap">
                  {order.total.toLocaleString()}
                </span>
                <motion.div
                  className="absolute inset-0 z-0"
                  initial={{ x: "-100%" }}
                  animate={isHovered ? { x: "200%" } : { x: "-100%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-primary-400/30 to-transparent" />
                </motion.div>
              </div>
              <span className="text-[9px] text-secondary-500 uppercase tracking-widest">
                Toman
              </span>
            </div>

            <motion.div
              animate={isHovered ? { x: 4 } : { x: 0 }}
              transition={{ duration: 0.3 }}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-primary-500 group-hover:text-state-500 transition-all duration-300"
            >
              <FiChevronRight className="w-3.5 h-3.5 text-secondary-400 group-hover:text-state-500 transition-colors" />
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {order.items.length > 1 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="relative px-4 md:px-5 pb-4 pt-3 border-t border-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center -space-x-2">
                  {order.items.slice(0, 4).map((item, i) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.2, zIndex: 10, y: -4 }}
                      className="relative w-9 h-9 rounded-full overflow-hidden bg-state-500 border-2 border-state-400 hover:border-primary-500 transition-colors cursor-pointer"
                      style={{ zIndex: 4 - i }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                        sizes="36px"
                      />
                    </motion.div>
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
