"use client";

export const HistoryHeader = () => {
  return (
    <div className="animate-fade-up flex flex-col items-center mb-10">
      <h1 className="text-3xl md:text-4xl font-audiowide text-neutral-50 mb-2">
        Order History
      </h1>
      <span className="text-xs text-secondary-500">تاریخچه سفارشات</span>

      <p className="text-sm text-secondary-400 mt-2">
        View all your previous orders and their details
      </p>
      <p className="text-xs text-secondary-500 mt-1">
        مشاهده تمام سفارشات قبلی و جزئیات آن‌ها
      </p>
    </div>
  );
};
