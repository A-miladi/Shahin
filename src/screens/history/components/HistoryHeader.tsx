"use client";

import { motion } from "framer-motion";

export const HistoryHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center mb-10"
    >
      <motion.h1
        initial={{ letterSpacing: "0.5em", opacity: 0 }}
        animate={{ letterSpacing: "0.02em", opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-audiowide text-neutral-50 mb-2"
      >
        Order History
      </motion.h1>
      <span className="text-xs text-secondary-500">تاریخچه سفارشات</span>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm text-secondary-400"
      >
        View all your previous orders and their details
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xs text-secondary-500 mt-1"
      >
        مشاهده تمام سفارشات قبلی و جزئیات آن‌ها
      </motion.p>
    </motion.div>
  );
};
