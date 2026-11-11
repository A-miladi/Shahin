import type { MenuItem } from "@/data";
import { MenuCard } from "./MenuCard";

interface MenuSectionProps {
  group: string;
  title: string;
  pTitle: string;
  items: MenuItem[];
}

export const MenuSection = ({ group, title, pTitle, items }: MenuSectionProps) => (
  <section className="snap-start overflow-hidden rounded-2xl border border-primary-500/20 bg-state-400">
    <header className="border-b border-white/10 bg-gradient-to-l from-primary-400/15 to-transparent px-4 py-4 sm:px-5">
      <p className="mb-1 text-xs text-primary-400">{group}</p>
      <h2 className="text-xl font-semibold text-neutral-50">{pTitle}</h2>
      <p lang="en" dir="ltr" className="text-sm text-secondary-400 text-right">{title}</p>
    </header>
    <ul className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2 sm:p-3">
      {items.map((item) => <MenuCard key={item[0]} item={item} />)}
    </ul>
  </section>
);
