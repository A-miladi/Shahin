"use client";

import { FiCheck } from "react-icons/fi";
import { useEffect } from "react";

interface SuccessOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessOverlay: React.FC<SuccessOverlayProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-state-500/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-up relative bg-state-400 border border-primary-500/30 rounded-3xl p-8 md:p-12 text-center max-w-md mx-4 overflow-hidden"
      >
        {/* Glow Background */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-primary-500/20 rounded-full blur-3xl" />

        {/* Checkmark */}
        <div className="relative mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-primary-500/20 border-2 border-primary-500 mb-6">
          <FiCheck className="relative w-10 h-10 text-primary-400" />
        </div>

        <h2 className="text-2xl font-serif text-neutral-50 mb-2">
          Order Placed!
        </h2>
        <p className="text-sm text-secondary-400 mb-1">
          Your order has been confirmed
        </p>
        <p className="text-xs text-secondary-500 mb-6">
          سفارش شما با موفقیت ثبت شد
        </p>

        <button
          onClick={onClose}
          className="px-8 py-3 bg-primary-500 hover:bg-primary-400 text-state-500 font-semibold rounded-full transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
