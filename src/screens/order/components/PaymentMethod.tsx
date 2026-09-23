"use client";

import { motion } from "framer-motion";
import { FiCreditCard, FiDollarSign } from "react-icons/fi";
import { PaymentMethodType } from "@/types/order";

interface PaymentMethodProps {
  value: PaymentMethodType;
  onChange: (value: PaymentMethodType) => void;
}

const options = [
  {
    id: "online" as const,
    name: "Online Payment",
    pName: "پرداخت آنلاین",
    description: "Pay securely with card",
    icon: FiCreditCard,
  },
  {
    id: "cash" as const,
    name: "Cash on Delivery",
    pName: "پرداخت در محل",
    description: "Pay when you receive the order",
    icon: FiDollarSign,
  },
];

export const PaymentMethod: React.FC<PaymentMethodProps> = ({
  value,
  onChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="relative  backdrop-blur-sm border border-white/5 rounded-3xl p-6 md:p-8 overflow-hidden"
    >
      <div className="absolute -top-16 w-1/2 h-70 lg:bg-primary-400/5 bg-primary-400/10 rounded-full blur-3xl" />

      <div className="flex items-center gap-3 mb-6">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500/10 border border-primary-500/20"
        >
          <FiCreditCard className="w-5 h-5 text-primary-400" />
        </motion.div>
        <div className="flex flex-col">
          <h2 className="text-lg font-serif text-neutral-50">Payment Method</h2>
          <span className="text-xs text-secondary-500">روش پرداخت</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {options.map((option) => {
          const isSelected = value === option.id;
          const Icon = option.icon;
          return (
            <motion.label
              key={option.id}
              whileHover={{ scale: 1.01, x: 4 }}
              whileTap={{ scale: 0.99 }}
              className={`relative flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-colors duration-300 overflow-hidden ${
                isSelected
                  ? "bg-primary-500/10 border-primary-500/40"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="payment-glow"
                  className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-transparent"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              <div className="relative w-5 h-5 flex items-center justify-center rounded-full border-2 border-secondary-500 z-10">
                {isSelected && (
                  <motion.div
                    layoutId="payment-radio"
                    className="w-2.5 h-2.5 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(170,142,119,0.6)]"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>

              <div className="flex-1 flex items-center justify-between z-10">
                <div>
                  <span className="text-sm font-medium text-neutral-50">
                    {option.name}{" "}
                    <span className="text-secondary-500 text-xs">
                      / {option.pName}
                    </span>
                  </span>
                  <p className="text-xs text-secondary-500 mt-1">
                    {option.description}
                  </p>
                </div>
                <motion.div
                  animate={{
                    scale: isSelected ? 1.2 : 1,
                    color: isSelected ? "#bfa691" : "#918780",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
              </div>

              <input
                type="radio"
                name="payment"
                value={option.id}
                checked={isSelected}
                onChange={() => onChange(option.id)}
                className="hidden"
              />
            </motion.label>
          );
        })}
      </div>
    </motion.div>
  );
};
