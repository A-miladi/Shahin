"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiCreditCard,
  FiLock,
  FiCheck,
  FiChevronRight,
} from "react-icons/fi";
import { gateways } from "@/data/gateways";
import { PaymentGateway } from "@/types/Payment";

interface PaymentBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onPaymentSuccess: () => void;
}

export const PaymentBottomSheet: React.FC<PaymentBottomSheetProps> = ({
  isOpen,
  onClose,
  total,
  onPaymentSuccess,
}) => {
  const [selectedGateway, setSelectedGateway] =
    useState<PaymentGateway>("zarinpal");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv2, setCvv2] = useState("");
  const [expiry, setExpiry] = useState("");
  const [otp, setOtp] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpiry(value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvv2(e.target.value.replace(/\D/g, "").slice(0, 4));
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
  };
  const resetForm = () => {
    setSelectedGateway("zarinpal");
    setCardNumber("");
    setCvv2("");
    setExpiry("");
    setOtp("");
  };
  const handleSubmit = async () => {
    setIsProcessing(true);
    // شبیه‌سازی درخواست به درگاه
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    resetForm();
    onPaymentSuccess();
    onClose();
  };

  const isFormValid =
    cardNumber.replace(/\s/g, "").length === 16 &&
    cvv2.length >= 3 &&
    expiry.length === 5 &&
    otp.length === 6;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-state-500/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) onClose();
            }}
            className="fixed bottom-0 left-0 right-0 z-[101] max-h-[90vh] bg-state-400 border-t border-primary-500/20 rounded-t-3xl overflow-hidden"
          >
            <div className="flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
              <div className="w-12 h-1 rounded-full bg-white/20" />
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500/10 border border-primary-500/20">
                  <FiCreditCard className="w-5 h-5 text-primary-400" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-lg font-serif text-neutral-50">
                    Payment Gateway
                  </h2>
                  <span className="text-xs text-secondary-500">
                    درگاه پرداخت
                  </span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-secondary-400 hover:text-neutral-50 transition-colors"
              >
                <FiX className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="px-6 py-5 max-h-[calc(90vh-180px)] overflow-y-auto scrollbar-custom">
              <div className="relative bg-gradient-to-br from-primary-500/10 to-primary-600/5 border border-primary-500/20 rounded-2xl p-4 mb-6 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl" />
                <div className="relative flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-secondary-500">
                      Amount to Pay
                    </span>
                    <span className="text-[10px] text-secondary-600">
                      مبلغ قابل پرداخت
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-bold text-primary-400">
                      {total.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-secondary-500 uppercase tracking-widest">
                      Toman
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-neutral-50">
                    Select Gateway
                  </h3>
                  <span className="text-[10px] text-secondary-500">
                    انتخاب درگاه
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {gateways.map((gateway) => {
                    const isSelected = selectedGateway === gateway.id;
                    return (
                      <motion.button
                        key={gateway.id}
                        onClick={() => setSelectedGateway(gateway.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          relative flex items-center gap-3 p-3 rounded-xl border
                          transition-all duration-300 overflow-hidden
                          ${
                            isSelected
                              ? "bg-primary-500/10 border-primary-500/40"
                              : "bg-white/5 border-white/10 hover:border-white/20"
                          }
                        `}
                      >
                        {/* Logo Circle */}
                        <div
                          className={`
                            relative flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
                            bg-gradient-to-br ${gateway.color} border
                            font-bold text-xs text-neutral-50
                          `}
                        >
                          {gateway.logo}
                        </div>

                        <div className="flex flex-col items-start min-w-0">
                          <span className="text-xs font-medium text-neutral-50 truncate">
                            {gateway.name}
                          </span>
                          <span className="text-[10px] text-secondary-500">
                            {gateway.pName}
                          </span>
                        </div>

                        {isSelected && (
                          <motion.div
                            layoutId="gateway-check"
                            className="absolute top-2 right-2 w-4 h-4 flex items-center justify-center rounded-full bg-primary-500"
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          >
                            <FiCheck className="w-2.5 h-2.5 text-state-500" />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-secondary-400 flex items-center gap-1">
                    <FiCreditCard className="w-3 h-3" />
                    Card Number{" "}
                    <span className="text-secondary-600">/ شماره کارت</span>
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardChange}
                    placeholder="0000 0000 0000 0000"
                    dir="ltr"
                    className="w-full bg-white/5 border border-white/10 text-neutral-50 placeholder-secondary-600 text-sm rounded-xl py-3 px-4 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all duration-300 font-mono tracking-wider"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-secondary-400">
                      CVV2 <span className="text-secondary-600">/ CVV2</span>
                    </label>
                    <input
                      type="text"
                      value={cvv2}
                      onChange={handleCvvChange}
                      placeholder="***"
                      dir="ltr"
                      className="w-full bg-white/5 border border-white/10 text-neutral-50 placeholder-secondary-600 text-sm rounded-xl py-3 px-4 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all duration-300 font-mono text-center tracking-widest"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-secondary-400">
                      Expiry <span className="text-secondary-600">/ انقضا</span>
                    </label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      dir="ltr"
                      className="w-full bg-white/5 border border-white/10 text-neutral-50 placeholder-secondary-600 text-sm rounded-xl py-3 px-4 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all duration-300 font-mono text-center"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-secondary-400 flex items-center gap-1">
                    <FiLock className="w-3 h-3" />
                    Dynamic Password{" "}
                    <span className="text-secondary-600">/ رمز پویا</span>
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="------"
                    dir="ltr"
                    className="w-full bg-white/5 border border-white/10 text-neutral-50 placeholder-secondary-600 text-sm rounded-xl py-3 px-4 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all duration-300 font-mono text-center tracking-[0.5em]"
                  />
                  <button className="text-[10px] text-primary-400 hover:text-primary-300 self-end transition-colors">
                    Get Code / دریافت رمز
                  </button>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-white/5 bg-state-400">
              <motion.button
                whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                onClick={handleSubmit}
                disabled={!isFormValid || isProcessing}
                className={`
                  relative w-full flex items-center justify-center gap-3
                  font-semibold py-4 rounded-full overflow-hidden
                  transition-all duration-300
                  ${
                    isFormValid && !isProcessing
                      ? "bg-primary-500 hover:bg-primary-400 text-state-500 shadow-[0_0_30px_rgba(170,142,119,0.3)]"
                      : "bg-white/5 text-secondary-500 cursor-not-allowed"
                  }
                `}
              >
                {isFormValid && !isProcessing && (
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                )}

                {isProcessing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <FiLock className="w-5 h-5" />
                    </motion.div>
                    <span className="relative z-10">Processing...</span>
                  </>
                ) : (
                  <>
                    <FiLock className="relative z-10 w-5 h-5" />
                    <span className="relative z-10">Pay Securely</span>
                    <FiChevronRight className="relative z-10 w-4 h-4" />
                  </>
                )}
              </motion.button>

              <div className="flex items-center justify-center gap-2 mt-3 text-[10px] text-secondary-600">
                <FiLock className="w-3 h-3" />
                <span>Secured by SSL Encryption</span>
                <span className="w-1 h-1 rounded-full bg-secondary-700" />
                <span>اتصال امن</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
