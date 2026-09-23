"use client";

import { motion } from "framer-motion";
import { FiClock } from "react-icons/fi";
import { Button } from "@/common/ui/Button";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface EmptyStateProps {
  title?: string;
  pTitle?: string;
  description?: string;
  pDescription?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Orders Yet",
  pTitle = "هنوز سفارشی ثبت نشده",
  description = "Start exploring our menu and place your first order",
  pDescription = "منوی ما را کاوش کنید و اولین سفارش خود را ثبت کنید",
}) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      {/* Icon Container with Glow */}
      <div className="relative mb-6">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-primary-500 rounded-full blur-2xl"
        />
        <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-state-400 border border-primary-500/20">
          <FiClock className="w-10 h-10 text-primary-400" />
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-serif text-neutral-50 mb-2">
        {title}
      </h2>
      <p className="text-sm text-secondary-500 mb-1" dir="rtl">
        {pTitle}
      </p>
      <p className="text-xs text-secondary-500 max-w-sm mx-auto mb-2">
        {description}
      </p>
      <p className="text-xs text-secondary-600 max-w-sm mx-auto mb-6" dir="rtl">
        {pDescription}
      </p>

      <Button
        variant="primary"
        icon={FiArrowLeft}
        onClick={() => router.push("/")}
        className="!px-6 !py-3"
      >
        Browse Menu
      </Button>
    </motion.div>
  );
};
