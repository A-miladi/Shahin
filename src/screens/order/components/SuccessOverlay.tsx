"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiCheck } from "react-icons/fi";

interface SuccessOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessOverlay: React.FC<SuccessOverlayProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-state-500/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-state-400 border border-primary-500/30 rounded-3xl p-8 md:p-12 text-center max-w-md mx-4 overflow-hidden"
          >
            {/* Glow Background */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-primary-500/20 rounded-full blur-3xl" />

            {/* Checkmark */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="relative mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-primary-500/20 border-2 border-primary-500 mb-6"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-primary-500/30 blur-md"
              />
              <FiCheck className="relative w-10 h-10 text-primary-400" />
            </motion.div>

            <h2 className="text-2xl font-serif text-neutral-50 mb-2">
              Order Placed!
            </h2>
            <p className="text-sm text-secondary-400 mb-1">
              Your order has been confirmed
            </p>
            <p className="text-xs text-secondary-500 mb-6">
              سفارش شما با موفقیت ثبت شد
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-8 py-3 bg-primary-500 hover:bg-primary-400 text-state-500 font-semibold rounded-full transition-colors"
            >
              Continue
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
