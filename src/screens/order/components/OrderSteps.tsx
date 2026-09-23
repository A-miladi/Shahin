"use client";

import { motion } from "framer-motion";
import { FiShoppingBag, FiCreditCard, FiCheck } from "react-icons/fi";

interface OrderStepsProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: "Shipping", pLabel: "ارسال", icon: FiShoppingBag },
  { id: 2, label: "Payment", pLabel: "پرداخت", icon: FiCreditCard },
  { id: 3, label: "Confirm", pLabel: "تایید", icon: FiCheck },
];

export const OrderSteps: React.FC<OrderStepsProps> = ({ currentStep }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative flex items-center justify-center gap-2 md:gap-4 mb-12"
    >
      {steps.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;
        const Icon = step.icon;

        return (
          <div key={step.id} className="flex items-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.1 * index,
                type: "spring",
                stiffness: 200,
              }}
              className="flex flex-col items-center gap-2 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="active-halo"
                  className="absolute -inset-3 rounded-full bg-primary-500/10 blur-xl"
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
              )}

              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`relative z-10 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border transition-colors duration-500 ${
                  isActive
                    ? "bg-gradient-to-br from-primary-500/70 border-primary-500 text-state-500 shadow-[0_0_25px_rgba(170,142,119,0.4)]"
                    : isCompleted
                      ? "bg-primary-500/20 border-primary-500 text-primary-400"
                      : "bg-white/5 border-white/10 text-secondary-500"
                }`}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <FiCheck className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <Icon
                    className={`w-5 h-5 ${isActive ? "text-primary-300" : ""}`}
                  />
                )}
              </motion.div>

              <div className="flex flex-col items-center">
                <motion.span
                  animate={{
                    color: isActive ? "#bfa691" : "#918780",
                    fontWeight: isActive ? 600 : 400,
                  }}
                  className="text-xs md:text-sm"
                >
                  {step.label}
                </motion.span>
                <span className="text-[10px] text-secondary-600">
                  {step.pLabel}
                </span>
              </div>
            </motion.div>

            {index < steps.length - 1 && (
              <div className="relative w-8 md:w-20 h-[2px] mx-2 mb-8 bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: isCompleted ? "100%" : "0%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-primary-400"
                />
              </div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};
