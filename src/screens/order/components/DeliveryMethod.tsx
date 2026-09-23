"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiTruck, FiMapPin } from "react-icons/fi";
import { DeliveryMethodType } from "@/types/order";

interface DeliveryMethodProps {
  value: DeliveryMethodType;
  onChange: (value: DeliveryMethodType) => void;
  address: string;
  onAddressChange: (address: string) => void;
}

const options = [
  {
    id: "pickup" as const,
    name: "Pickup",
    pName: "حضوری",
    price: "Free",
    description: "Get your order from our cafe",
  },
  {
    id: "delivery" as const,
    name: "Delivery",
    pName: "ارسال",
    price: "20,000 T",
    description: "We deliver to your address",
  },
];

export const DeliveryMethod: React.FC<DeliveryMethodProps> = ({
  value,
  onChange,
  address,
  onAddressChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="relative backdrop-blur-sm border border-white/5 rounded-3xl p-6 md:p-8 overflow-hidden"
    >
      <div className="absolute -top-16 -left-16 w-full h-40  bg-primary-400/10 rounded-full blur-3xl" />

      <div className="flex items-center gap-3 mb-6">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500/10 border border-primary-500/20"
        >
          <FiTruck className="w-5 h-5 text-primary-400" />
        </motion.div>
        <div className="flex flex-col">
          <h2 className="text-lg font-serif text-neutral-50">
            Delivery Method
          </h2>
          <span className="text-xs text-secondary-500">روش تحویل</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {options.map((option) => {
          const isSelected = value === option.id;
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
                  layoutId="delivery-glow"
                  className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-transparent"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              <div className="relative w-5 h-5 flex items-center justify-center rounded-full border-2 border-secondary-500 transition-colors z-10">
                {isSelected && (
                  <motion.div
                    layoutId="delivery-radio"
                    className="w-2.5 h-2.5 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(170,142,119,0.6)]"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>

              <div className="flex-1 z-10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-50">
                    {option.name}{" "}
                    <span className="text-secondary-500 text-xs">
                      / {option.pName}
                    </span>
                  </span>
                  <span className="text-xs text-primary-400 font-semibold">
                    {option.price}
                  </span>
                </div>
                <p className="text-xs text-secondary-500 mt-1">
                  {option.description}
                </p>
              </div>

              <input
                type="radio"
                name="delivery"
                value={option.id}
                checked={isSelected}
                onChange={() => onChange(option.id)}
                className="hidden"
              />
            </motion.label>
          );
        })}

        <AnimatePresence>
          {value === "delivery" && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-2 pt-2">
                <label className="text-sm text-secondary-300">
                  Address <span className="text-secondary-500">/ آدرس</span>
                </label>
                <div className="relative group">
                  <FiMapPin className="absolute left-4 top-4 w-4 h-4 text-secondary-500 group-focus-within:text-primary-400 transition-colors" />
                  <textarea
                    placeholder="Enter your full address..."
                    value={address}
                    onChange={(e) => onAddressChange(e.target.value)}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 text-neutral-50 placeholder-secondary-600 text-sm rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all duration-300 resize-none"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
