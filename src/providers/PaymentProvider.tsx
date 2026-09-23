"use client";

import { PaymentBottomSheet } from "@/common/components/PaymentBottomSheet";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

interface PaymentContextType {
  openPayment: (amount: number, onSuccess?: () => void) => void;
  closePayment: () => void;
  isOpen: boolean;
}

const PaymentContext = createContext<PaymentContextType | null>(null);

interface PaymentProviderProps {
  children: ReactNode;
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [onSuccessCallback, setOnSuccessCallback] = useState<
    (() => void) | undefined
  >(undefined);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.body.style.width = "";

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  const openPayment = useCallback(
    (amountToPay: number, onSuccess?: () => void) => {
      setAmount(amountToPay);
      setOnSuccessCallback(() => onSuccess);
      setIsOpen(true);
    },
    [],
  );

  const closePayment = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSuccess = useCallback(() => {
    onSuccessCallback?.();
    setIsOpen(false);
  }, [onSuccessCallback]);

  return (
    <PaymentContext.Provider value={{ openPayment, closePayment, isOpen }}>
      {children}
      <PaymentBottomSheet
        isOpen={isOpen}
        onClose={closePayment}
        total={amount}
        onPaymentSuccess={handleSuccess}
      />
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};
