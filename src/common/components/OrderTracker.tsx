"use client";

import { BiCart, BiCoffee, BiPackage } from "react-icons/bi";
import type { IconType } from "react-icons";

type StepStatus = "completed" | "active" | "pending";

interface Step {
  id: number;
  icon: IconType;
}

interface OrderTrackerProps {
  currentStep: number;
  size?: number;
  className?: string;
}

const STEPS: Step[] = [
  { id: 1, icon: BiCart },
  { id: 2, icon: BiCoffee },
  { id: 3, icon: BiPackage },
];

export default function OrderTracker({
  currentStep,
  size = 32,
  className = "",
}: OrderTrackerProps) {
  const getStatus = (stepId: number): StepStatus => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "active";
    return "pending";
  };

  const iconSize = Math.round(size * 0.55);

  return (
    <div
      className={`
        w-full flex items-center justify-between
        px-2
        ${className}
      `}
    >
      {STEPS.map((step, index) => {
        const status = getStatus(step.id);
        const isLast = index === STEPS.length - 1;
        const nextStatus = !isLast ? getStatus(STEPS[index + 1].id) : null;

        const lineIsPrimary =
          nextStatus === "completed" || nextStatus === "active";

        const Icon = step.icon;
        const isPending = status === "pending";

        return (
          <div
            key={step.id}
            className="flex items-center flex-1 last:flex-none"
          >
            <div
              style={{ width: size, height: size }}
              className={`
                flex items-center justify-center shrink-0
                rounded-full
                transition-all duration-300
                ${
                  isPending
                    ? "bg-neutral-500/30 text-neutral-500"
                    : "bg-primary-400 text-state-500"
                }
              `}
            >
              <Icon size={iconSize} />
            </div>

            {!isLast && (
              <div className="flex-1 mx-2 h-[1px] relative overflow-hidden">
                <div className="absolute inset-0 bg-neutral-500/10" />
                <div
                  className={`
                    absolute inset-y-0 right-0
                    bg-gradient-to-r via-primary-400
                    transition-all duration-500 ease-out
                    ${lineIsPrimary ? "w-full" : "w-0"}
                  `}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
