import { DesktopHero } from "./hero/DesktopHero";
import { MobileHero } from "./hero/MobileHero";
import { PopularItems } from "./PopularItems";

export const HomeScreen = () => {
  return (
    <main
      className="w-full min-h-screen px-4 lg:p-0 bg-black overflow-hidden"
      style={{ paddingTop: "calc(1rem + env(safe-area-inset-top, 0px))" }}
    >
      <MobileHero />
      <DesktopHero />
      <PopularItems />
    </main>
  );
};
