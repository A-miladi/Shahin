"use client";

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
    <div className="animate-fade-up delay-200 relative flex items-center justify-center gap-2 md:gap-4 mb-12">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;
        const Icon = step.icon;

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-2 relative">
              <div
                className={`
                  relative z-10 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center
                  rounded-full border transition-all duration-500
                  ${
                    isActive
                      ? "bg-gradient-to-br from-primary-500/70 border-primary-500 text-state-500 shadow-[0_0_25px_rgba(170,142,119,0.4)]"
                      : isCompleted
                        ? "bg-primary-500/20 border-primary-500 text-primary-400"
                        : "bg-white/5 border-white/10 text-secondary-500"
                  }
                `}
              >
                {isCompleted ? (
                  <FiCheck className="w-6 h-6" />
                ) : (
                  <Icon
                    className={`w-5 h-5 ${isActive ? "text-primary-300" : ""}`}
                  />
                )}
              </div>

              <div className="flex flex-col items-center">
                <span
                  className={`
                    text-xs md:text-sm transition-colors duration-300
                    ${
                      isActive
                        ? "text-primary-400 font-semibold"
                        : "text-secondary-500 font-normal"
                    }
                  `}
                >
                  {step.label}
                </span>
                <span className="text-[10px] text-secondary-600">
                  {step.pLabel}
                </span>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div className="relative w-8 md:w-20 h-[2px] mx-2 mb-8 bg-white/10 overflow-hidden">
                <div
                  className={`
                    absolute top-0 left-0 h-full
                    bg-gradient-to-r from-primary-500 to-primary-400
                    origin-left transition-transform duration-600 ease-in-out
                    ${isCompleted ? "scale-x-100" : "scale-x-0"}
                    w-full
                  `}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
