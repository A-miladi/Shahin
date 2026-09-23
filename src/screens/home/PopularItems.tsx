"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiPlus, FiStar } from "react-icons/fi";
import { menuData, CoffeeItem } from "@/data";

interface PopularItemsProps {
  onAdd?: (item: CoffeeItem) => void;
  onClick?: (item: CoffeeItem) => void;
}

export const PopularItems: React.FC<PopularItemsProps> = ({
  onAdd,
  onClick,
}) => {
  const popularItems = menuData.filter((item) => item.isPopular);

  return (
    <section className="w-full max-w-7xl mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-2">
          <FiStar className="w-5 h-5 text-primary-500 fill-primary-500" />
          <h2 className="text-xl md:text-2xl font-serif text-neutral-50">
            Today's Suggestions
          </h2>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {popularItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            onClick={() => onClick?.(item)}
            className="group relative flex flex-col bg-state-400 border border-white/5 hover:border-primary-600/50 rounded-2xl overflow-hidden cursor-pointer transition-colors duration-300 shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(170,142,119,0.2)]"
          >
            <div className="relative w-full aspect-square overflow-hidden bg-state-500">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full p-4"
              >
                {/* 👈 نمایش کامل تصویر */}
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </motion.div>

              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-state-400 to-transparent" />

              <div className="absolute top-3 left-3 flex items-center gap-1 bg-primary-500 text-state-500 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg">
                <FiStar className="w-3 h-3 fill-state-500" />
                Popular
              </div>

              <motion.button
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd?.(item);
                }}
                className="absolute bottom-3 right-3 w-9 h-9 flex items-center justify-center bg-primary-500 hover:bg-primary-400 text-state-500 rounded-full shadow-lg transition-colors duration-300 z-10"
              >
                <FiPlus className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="flex flex-col p-4 bg-state-400">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex flex-col">
                  <h3 className="text-base font-serif text-neutral-50 group-hover:text-primary-400 transition-colors duration-300">
                    {item.name}
                  </h3>
                  <span className="text-xs text-secondary-400 font-light">
                    {item.pName}
                  </span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-primary-400 font-semibold text-sm whitespace-nowrap">
                    {item.price.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-secondary-500 uppercase tracking-wide">
                    Toman
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd?.(item);
                }}
                className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-primary-500 hover:text-state-500 text-secondary-300 text-xs font-medium py-2.5 rounded-xl transition-all duration-300"
              >
                <FiPlus className="w-3.5 h-3.5" />
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
