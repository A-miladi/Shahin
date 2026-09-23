"use client";

import { DesktopHero } from "./hero/DesktopHero";
import { PopularItems } from "./PopularItems";
import { MenuSection } from "../../common/components/MenuSection";
import { menuData, CoffeeItem } from "@/data";
import { MobileHero } from "./hero/MobileHero";

export const HomeScreen = () => {
  const hotDrinks = menuData
    .filter((item) => item.category === "Hot Drinks" && !item.isPopular)
    .slice(0, 4);

  const coldDrinks = menuData
    .filter((item) => item.category === "Cold Drinks" && !item.isPopular)
    .slice(0, 4);

  const handleAdd = (item: CoffeeItem) => {
    console.log("Added to cart:", item.name);
  };

  const handleClick = (item: CoffeeItem) => {
    console.log("Navigate to detail:", item.id);
  };

  const handleViewAllHot = () => {
    console.log("Navigate to /menu/hot-drinks");
  };

  const handleViewAllCold = () => {
    console.log("Navigate to /menu/cold-drinks");
  };

  return (
    <main className="w-full min-h-screen px-4 pt-4 lg:p-0 bg-black overflow-hidden">
      <MobileHero />
      <DesktopHero />
      <PopularItems />

      <MenuSection
        title="Hot Drinks"
        pTitle="نوشیدنی‌های گرم"
        items={hotDrinks}
        onAdd={handleAdd}
        onClick={handleClick}
        onViewAll={handleViewAllHot}
      />

      <MenuSection
        title="Cold Drinks"
        pTitle="نوشیدنی‌های سرد"
        items={coldDrinks}
        onAdd={handleAdd}
        onClick={handleClick}
        onViewAll={handleViewAllCold}
      />
    </main>
  );
};
