"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiPhone } from "react-icons/fi";
import { CustomerFormData } from "@/types/order";

interface CustomerInfoProps {
  formData: CustomerFormData;
  onChange: (data: CustomerFormData) => void;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.3 + i * 0.1 },
  }),
};

export const CustomerInfo: React.FC<CustomerInfoProps> = ({
  formData,
  onChange,
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      custom={0}
      className="relative bg-transparent backdrop-blur-sm border border-white/5 rounded-3xl p-6 md:p-8 overflow-hidden group"
    >
      <div className="absolute -top-16 -right-16 w-full lg:w-1/2 lg:h-20 h-40 bg-primary-400/10 rounded-full blur-3xl" />

      <div className="relative flex items-center gap-3 mb-6">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500/10 border border-primary-500/20"
        >
          <FiUser className="w-5 h-5 text-primary-400" />
        </motion.div>
        <div className="flex flex-col">
          <h2 className="text-lg font-serif text-neutral-50">
            Customer Information
          </h2>
          <span className="text-xs text-secondary-500">اطلاعات مشتری</span>
        </div>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
        <FloatingInput
          label="Full Name"
          pLabel="نام کامل"
          value={formData.name}
          onChange={(value) => onChange({ ...formData, name: value })}
          icon={FiUser}
        />
        <FloatingInput
          label="Phone Number"
          pLabel="شماره تماس"
          value={formData.phone}
          onChange={(value) => onChange({ ...formData, phone: value })}
          icon={FiPhone}
          dir="ltr"
        />
      </div>
    </motion.div>
  );
};

interface FloatingInputProps {
  label: string;
  pLabel: string;
  value: string;
  onChange: (value: string) => void;
  icon: any;
  dir?: "ltr" | "rtl";
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  pLabel,
  value,
  onChange,
  icon: Icon,
  dir = "rtl",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <motion.div whileFocus={{ scale: 1.01 }} className="relative">
      <motion.label
        animate={{
          y: isActive ? -28 : 0,
          scale: isActive ? 0.85 : 1,
          color: isActive ? "#bfa691" : "#918780",
        }}
        transition={{ duration: 0.2 }}
        className="absolute left-4 top-3 text-sm pointer-events-none origin-left"
      >
        {label} <span className="text-secondary-600 text-xs">/ {pLabel}</span>
      </motion.label>

      <div className="relative">
        <Icon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-500" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          dir={dir}
          className="w-full bg-primary-500/5 border border-white/10 text-neutral-50 text-sm rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all duration-300"
        />

        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: isFocused ? "100%" : "0%" }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
        />
      </div>
    </motion.div>
  );
};
