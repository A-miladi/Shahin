import Image from "next/image";
import type { MenuItem } from "@/data";

export const MenuCard = ({ item }: { item: MenuItem }) => {
  const [name, pName, image] = item;

  return (
    <li className="flex min-h-24 items-center gap-3 rounded-xl border border-white/5 bg-state-500/80 p-2.5 sm:gap-4">
      <div className="relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-lg bg-primary-500/10 text-primary-400 sm:size-20">
        <Image src={image} alt="" fill sizes="(min-width: 640px) 80px, 64px" className="object-contain p-1" />
      </div>
      <div className="min-w-0 flex-1 text-start">
        <p lang="fa" className="text-base text-neutral-50">{pName}</p>
        <p lang="en" dir="ltr" className="text-sm text-secondary-400 text-right">{name}</p>
      </div>
      <span className="shrink-0 px-1 text-primary-400">-</span>
    </li>
  );
};
