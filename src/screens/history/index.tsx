"use client";

import { useMemo, useState } from "react";
import { HistoryHeader } from "./components/HistoryHeader";
import { HistoryFilter } from "./components/HistoryFilter";
import { HistoryItem } from "./components/HistoryItem";
import { historyData } from "@/data/history";
import { HistoryItemData, OrderFilterCategory } from "@/types/history";
import { EmptyState } from "@/common/components/EmptyState";
import { ParticleBackground } from "@/common/layout/ParticleBackground";

export const HistoryScreen = () => {
  const [activeFilter, setActiveFilter] = useState<OrderFilterCategory>("All");

  const filteredOrders = useMemo(() => {
    if (activeFilter === "All") return historyData;
    return historyData.filter((order) => order.category === activeFilter);
  }, [activeFilter]);

  const handleOrderClick = (order: HistoryItemData) => {
    console.log("Open order detail:", order.orderNumber);
    // router.push(`/history/${order.id}`);
  };

  return (
    <main
      className="relative w-full min-h-screen bg-state-500 pb-24 lg:pb-16 overflow-hidden"
      style={{
        paddingTop: "calc(2rem + env(safe-area-inset-top, 0px))",
      }}
    >
      <ParticleBackground />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:pt-20 lg:px-0">
        <HistoryHeader />

        <HistoryFilter active={activeFilter} onChange={setActiveFilter} />

        {filteredOrders.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {filteredOrders.map((order, index) => (
              <HistoryItem
                key={order.id}
                order={order}
                onClick={handleOrderClick}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
