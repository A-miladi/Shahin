"use client";

import { useState } from "react";
import { FiUser, FiPhone } from "react-icons/fi";
import { CustomerFormData } from "@/types/order";

interface CustomerInfoProps {
  formData: CustomerFormData;
  onChange: (data: CustomerFormData) => void;
}

export const CustomerInfo: React.FC<CustomerInfoProps> = ({
  formData,
  onChange,
}) => {
  return (
    <div className="animate-fade-up delay-300 relative bg-transparent backdrop-blur-sm border border-white/5 rounded-3xl p-6 md:p-8 overflow-hidden group">
      <div className="absolute -top-16 -right-16 w-full lg:w-1/2 lg:h-20 h-40 bg-primary-400/10 rounded-full blur-3xl" />

      <div className="relative flex items-center gap-3 mb-6">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500/10 border border-primary-500/20 transition-transform duration-500 group-hover:rotate-[360deg]">
          <FiUser className="w-5 h-5 text-primary-400" />
        </div>
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
    </div>
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
    <div className="relative">
      <label
        className={`
          absolute left-4 top-3 text-sm pointer-events-none origin-left
          transition-all duration-200 ease-out
          ${
            isActive
              ? "-translate-y-7 scale-[0.85] text-primary-400"
              : "translate-y-0 scale-100 text-secondary-500"
          }
        `}
      >
        {label} <span className="text-secondary-600 text-xs">/ {pLabel}</span>
      </label>

      <div className="relative">
        <Icon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-500" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          dir={dir}
          className="w-full bg-primary-500/5 border border-white/10 text-neutral-50 text-sm rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-colors duration-300"
        />

        <div
          className={`
            absolute bottom-0 left-0 h-[2px] rounded-full
            bg-gradient-to-r from-primary-500 to-primary-400
            origin-left transition-transform duration-300
            ${isFocused ? "scale-x-100" : "scale-x-0"}
            w-full
          `}
        />
      </div>
    </div>
  );
};
