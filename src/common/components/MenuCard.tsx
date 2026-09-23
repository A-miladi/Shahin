"use client";

import Image from "next/image";
import { FiPlus, FiStar } from "react-icons/fi";
import { CoffeeItem } from "@/data";

interface MenuCardProps {
  item: CoffeeItem;
  onAdd?: (item: CoffeeItem) => void;
  onClick?: (item: CoffeeItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onAdd, onClick }) => {
  return (
    <div
      onClick={() => onClick?.(item)}
      className="group relative flex flex-col w-full bg-state-400 border border-white/5 hover:border-primary-600/50 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(170,142,119,0.2)] hover:-translate-y-2 animate-fade-up"
    >
      {/* ==================== تصویر ==================== */}
      <div className="relative w-full aspect-square overflow-hidden bg-state-500">
        <div className="w-full h-full p-4 transition-transform duration-500 ease-out group-hover:scale-105">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain drop-shadow-2xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* گرادیانت پایین تصویر */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-state-400 to-transparent" />

        {/* ==================== بج Popular ==================== */}
        {item.isPopular && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-primary-500 text-state-500 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg animate-fade-in delay-300">
            <FiStar className="w-3 h-3 fill-state-500" />
            Popular
          </div>
        )}

        {/* ==================== دکمه + ==================== */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd?.(item);
          }}
          className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center bg-gradient-to-bl from-primary-400/50 hover:bg-primary-400 text-state-500 rounded-full shadow-sm shadow-black/30 backdrop-blur-sm transition-all duration-300 z-10 hover:scale-115 hover:rotate-90 active:scale-90"
        >
          <FiPlus className="w-5 h-5 text-primary-200" />
        </button>
      </div>

      {/* ==================== اطلاعات ==================== */}
      <div className="flex flex-col w-full p-4 md:p-5 bg-state-400">
        <div className="flex items-start w-full flex-col justify-between gap-2 mb-2">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-lg md:text-xl truncate font-serif text-neutral-50 group-hover:text-primary-400 transition-colors duration-300">
              {item.name}
            </h3>
            <span className="text-sm text-secondary-400 font-light">
              {item.pName}
            </span>
          </div>

          <div className="flex items-center bg-primary-400/10 py-1.5 px-2 rounded-xl justify-between w-full">
            <span className="text-primary-400 font-semibold text-sm md:text-base">
              {item.price.toLocaleString()}
            </span>
            <span className="text-[10px] text-secondary-500 uppercase tracking-wide">
              Toman
            </span>
          </div>
        </div>

        <div className="w-full h-[1px] bg-white/5 my-3" />

        <p className="text-xs text-secondary-400 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
};
