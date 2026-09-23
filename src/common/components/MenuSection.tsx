"use client";

import { CoffeeItem } from "@/data";
import { FaChevronRight } from "react-icons/fa6";
import { MenuCard } from "./MenuCard";

interface MenuSectionProps {
  title: string;
  pTitle?: string;
  items: CoffeeItem[];
  onAdd?: (item: CoffeeItem) => void;
  onClick?: (item: CoffeeItem) => void;
  onViewAll?: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  title,
  pTitle,
  items,
  onAdd,
  onClick,
  onViewAll,
}) => {
  if (items.length === 0) return null;

  return (
    <section className="w-full max-w-7xl mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl md:text-3xl font-serif text-neutral-50">
            {title}
          </h2>
          {pTitle && (
            <span className="lg:text-sm text-xs text-secondary-400 font-light">
              {`( ${pTitle} )`}
            </span>
          )}
        </div>

        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm flex items-center gap-1 text-primary-500 hover:text-primary-400 hover:underline transition-all"
          >
            View All
            <FaChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} onAdd={onAdd} onClick={onClick} />
        ))}
      </div>
    </section>
  );
};
