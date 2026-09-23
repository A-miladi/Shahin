"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { OrderSteps } from "./components/OrderSteps";
import { CustomerInfo } from "./components/CustomerInfo";
import { DeliveryMethod } from "./components/DeliveryMethod";
import { PaymentMethod } from "./components/PaymentMethod";
import { OrderSummary } from "./components/OrderSummary";
import { SuccessOverlay } from "./components/SuccessOverlay";
import {
  DeliveryMethodType,
  PaymentMethodType,
  CustomerFormData,
  OrderItem,
} from "@/types/order";
import { ParticleBackground } from "@/common/layout/ParticleBackground";

const sampleOrder: OrderItem[] = [
  { id: 3, name: "Cappuccino", pName: "کاپوچینو", price: 75000, quantity: 2 },
  { id: 8, name: "Ice Latte", pName: "آیس لاته", price: 85000, quantity: 1 },
];

export const OrderScreen = () => {
  const [currentStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethodType>("delivery");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodType>("online");
  const [formData, setFormData] = useState<CustomerFormData>({
    name: "",
    phone: "",
    address: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePlaceOrder = () => {
    setShowSuccess(true);
    console.log("Place Order:", {
      items: sampleOrder,
      customer: formData,
      delivery: deliveryMethod,
      payment: paymentMethod,
    });
  };

  return (
    <main className="relative w-full min-h-screen bg-state-500 pt-8 lg:pt-24 pb-16 overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-10"
        >
          <motion.h1
            initial={{ letterSpacing: "0.5em", opacity: 0 }}
            animate={{ letterSpacing: "0.02em", opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-audiowide text-neutral-50 mb-2"
          >
            Checkout
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-secondary-400"
          >
            Complete your order in 3 simple steps
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs text-secondary-500 mt-1"
          >
            سفارش خود را در ۳ مرحله ساده تکمیل کنید
          </motion.p>
        </motion.div>

        <OrderSteps currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <CustomerInfo formData={formData} onChange={setFormData} />
            <DeliveryMethod
              value={deliveryMethod}
              onChange={setDeliveryMethod}
              address={formData.address}
              onAddressChange={(address) =>
                setFormData({ ...formData, address })
              }
            />
            <PaymentMethod value={paymentMethod} onChange={setPaymentMethod} />
          </div>

          <OrderSummary
            items={sampleOrder}
            deliveryMethod={deliveryMethod}
            onPlaceOrder={handlePlaceOrder}
          />
        </div>
      </div>

      <SuccessOverlay
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </main>
  );
};
