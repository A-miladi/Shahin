"use client";

import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { DeliveryMethodType, OrderItem } from "@/types/order";
import { usePayment } from "@/providers/PaymentProvider";

interface OrderSummaryProps {
  items: OrderItem[];
  deliveryMethod: DeliveryMethodType;
  onPlaceOrder: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  deliveryMethod,
  onPlaceOrder,
}) => {
  const { openPayment } = usePayment();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = deliveryMethod === "delivery" ? 20000 : 0;
  const tax = Math.round(subtotal * 0.09);
  const total = subtotal + deliveryFee + tax;

  const handleOpenPayment = () => {
    openPayment(total, onPlaceOrder);
  };

  return (
    <div className="animate-fade-up delay-300 lg:col-span-1">
      <div className="bg-state-500 backdrop-blur-sm border border-primary-400/10 rounded-3xl p-6 md:p-8 sticky top-24 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-full h-60 bg-primary-400/10 rounded-full blur-3xl" />

        <div className="relative flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500/10 border border-primary-500/20">
            <FiShoppingBag className="w-5 h-5 text-primary-400" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-serif text-neutral-50">
              Order Summary
            </h2>
            <span className="text-xs text-secondary-500">خلاصه سفارش</span>
          </div>
        </div>

        <div className="relative flex flex-col gap-4 mb-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 pb-4 border-b border-white/5 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-500/10 text-primary-400 text-xs font-bold">
                  {item.quantity}x
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-neutral-50 font-medium">
                    {item.name}
                  </span>
                  <span className="text-xs text-secondary-500">
                    {item.pName}
                  </span>
                </div>
              </div>
              <span className="text-sm text-primary-400 font-semibold whitespace-nowrap">
                {(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        <div className="relative flex flex-col gap-3 py-4 border-t border-b border-white/5">
          <SummaryRow
            label="Subtotal"
            pLabel="جمع جزء"
            value={`${subtotal.toLocaleString()} T`}
          />
          <SummaryRow
            label="Tax (9%)"
            pLabel="مالیات"
            value={`${tax.toLocaleString()} T`}
          />
          <SummaryRow
            label="Delivery"
            pLabel="ارسال"
            value={
              deliveryFee === 0 ? "Free" : `${deliveryFee.toLocaleString()} T`
            }
          />
        </div>

        <div className="relative flex items-center justify-between py-4">
          <div className="flex flex-col">
            <span className="text-base font-serif text-neutral-50">Total</span>
            <span className="text-xs text-secondary-500">جمع کل</span>
          </div>
          <span className="text-2xl font-bold text-primary-400">
            {total.toLocaleString()} T
          </span>
        </div>

        <button
          onClick={handleOpenPayment}
          className="relative w-full flex items-center justify-center gap-3 bg-primary-500 hover:bg-primary-400 text-state-500 font-semibold py-4 rounded-full overflow-hidden transition-colors duration-300 shadow-[0_0_30px_rgba(170,142,119,0.3)]"
        >
          <span className="relative z-10">Place Order</span>
          <FiArrowRight className="relative z-10 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const SummaryRow: React.FC<{
  label: string;
  pLabel: string;
  value: string;
}> = ({ label, pLabel, value }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-secondary-400">
      {label} <span className="text-secondary-600 text-xs">/ {pLabel}</span>
    </span>
    <span className="text-neutral-50">{value}</span>
  </div>
);
