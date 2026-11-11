"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronDown, FiChevronUp, FiSearch, FiX } from "react-icons/fi";
import { menuGroups } from "@/data";
import styles from "./runway.module.css";

const entries = menuGroups.flatMap((bar) =>
  bar.categories.flatMap((category) =>
    category.items.map((item) => ({
      id: `${bar.title}/${category.title}/${item[0]}`,
      name: item[0],
      pName: item[1],
      group: bar.pTitle,
      category: category.pTitle,
      search: normalize([item[0], item[1], bar.title, bar.pTitle, category.title, category.pTitle].join(" ")),
      image: item[2],
    })),
  ),
);
const depths = [
  [1.2, 1.14, 1.18, 0, 1],
  [.744, .89, .832, 0, 1],
  [.496, .777, .574, 1.5, 1],
  [.346, .704, .436, 4, 1],
  [.235, .651, .334, 8, .86],
  [.15, .616, .258, 12, .5],
  [.085, .59, .19, 17, 0],
];

function normalize(text: string) {
  return text.toLowerCase().normalize("NFKD")
    .replace(/\p{M}/gu, "").replace(/\biced\b/g, "ice")
    .replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/[\s\u200c]+/g, "");
}

const wrap = (value: number, length: number) => ((value % length) + length) % length;
const number = (value: number) => String(value).padStart(2, "0");

function Track({ items }: { items: typeof entries }) {
  const stage = useRef<HTMLElement>(null);
  const rail = useRef<HTMLElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const roll = useRef<HTMLSpanElement>(null);
  const drinkNames = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLSpanElement>(null);
  const controls = useRef<{ step: (direction: number) => void; select: (index: number) => void }>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const surface = stage.current!;
    const productRail = rail.current!;
    const numberStrip = roll.current!;
    const cursor = ring.current!;
    const models = Array.from(line.current!.children) as HTMLElement[];
    const cards = Array.from(productRail.children) as HTMLElement[];
    const names = Array.from(drinkNames.current!.children) as HTMLElement[];
    const count = items.length;
    const desktopBackEdge = count > 1 ? Math.min(5, count - 1) : 5;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = matchMedia("(max-width: 820px)");
    let p = 0;
    let target = 0;
    let last = 0;
    let animation = 0;
    let wheelTimer: ReturnType<typeof setTimeout>;
    let drag: { id: number; x: number; y: number; start: number; distance: number } | undefined;
    let width = 0;
    let height = 0;
    let activeIndex = 0;

    function paint() {
      const front = wrap(Math.round(p), count);
      if (front !== activeIndex) {
        activeIndex = front;
        setActive(front);
      }
      models.forEach((model, index) => {
        let depth = wrap(index - p, count);
        if (mobile.matches) {
          if (depth > count / 2) depth -= count;
          const distance = Math.abs(depth);
          model.hidden = distance >= 1.5;
          if (model.hidden) return;

          const focus = Math.max(0, 1 - distance);
          const scale = .52 + .48 * focus;
          const x = width * (.5 - depth * .39);
          const y = height * (.49 - depth * .264);
          model.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%, -50%) scale(${scale})`;
          model.style.filter = focus === 1 ? "" : `blur(${4.5 * (1 - focus) / scale}px)`;
          model.style.opacity = String(distance <= 1 ? 1 - distance * .55 : (1.5 - distance) * .9);
          model.style.zIndex = String(100 - Math.round(distance * 10));
          return;
        }
        if (depth > count - 1) depth -= count;
        model.hidden = depth <= -1 || depth >= desktopBackEdge;
        if (model.hidden) return;

        const stop = Math.max(0, depth + 1);
        const first = Math.floor(stop);
        const fraction = stop - first;
        const [x, feet, size, blur, opacity] = depths[first].map((value, column) =>
          value + (depths[Math.min(first + 1, 6)][column] - value) * fraction,
        );
        const [activeX, activeFeet, activeSize] = depths[1];
        const scale = size * 1.1 / 1.2;
        const centerX = width * (.5 + (x - activeX) * .8);
        const centerY = height * (.5 + (feet - size / 2) - (activeFeet - activeSize / 2) - depth * .055);
        model.style.transform = `translate3d(${centerX - width * .23 * scale}px,${centerY - height * .6 * scale}px,0) scale(${scale})`;
        model.style.filter = blur ? `blur(${blur / scale}px)` : "";
        // Fade out on both sides before the same element wraps to the other end.
        const edgeOpacity = Math.min(1, (depth + 1) / .45, desktopBackEdge - depth);
        model.style.opacity = String(opacity * edgeOpacity);
        model.style.zIndex = String(100 - Math.round(depth * 10));
      });
      const railWrapAt = mobile.matches ? count / 2 : count - 1;
      cards.forEach((card, index) => {
        let offset = wrap(index - p, count);
        if (offset > railWrapAt) offset -= count;
        card.style.setProperty("--offset", String(offset));
      });
      numberStrip.style.transform = `translateY(${-wrap(p, count) * 100 / (count + 1)}%)`;
      names.forEach((name, index) => {
        let offset = wrap(index - p, names.length);
        if (offset > names.length / 2) offset -= names.length;
        const distance = Math.abs(offset);
        name.hidden = distance >= 1.5;
        if (name.hidden) return;

        name.style.setProperty("--name-offset", String(offset));
        name.style.setProperty("--name-distance", String(Math.min(1, distance)));
        name.style.opacity = String(Math.max(0, 1 - distance / 1.5));
      });
    }

    function frame(now: number) {
      const delta = last ? Math.min(50, now - last) : 16;
      last = now;
      p = motion.matches ? target : p + (target - p) * (1 - Math.exp(-delta * .0072));
      if (Math.abs(target - p) < .0004) p = target;
      paint();
      animation = p === target ? 0 : requestAnimationFrame(frame);
    }

    function wake() {
      if (animation) return;
      last = 0;
      animation = requestAnimationFrame(frame);
    }

    function step(direction: number) {
      if (count < 2) return;
      clearTimeout(wheelTimer);
      target = Math.round(target) + direction;
      wake();
    }

    controls.current = {
      step,
      select(index) {
        if (count < 2) return;
        clearTimeout(wheelTimer);
        const current = Math.round(target);
        const delta = wrap(index - current, count);
        target = current + (delta > count / 2 ? delta - count : delta);
        wake();
      },
    };

    function measure() {
      width = surface.clientWidth;
      height = surface.clientHeight;
      paint();
      surface.dataset.ready = "true";
    }

    function wheel(event: WheelEvent) {
      if (count < 2 || event.ctrlKey) return;
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? height : 1;
      const delta = (event.deltaY + event.deltaX) * unit;
      target += Math.max(-120, Math.min(delta, 120)) / 420;
      wake();
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        target = Math.round(target);
        wake();
      }, 150);
    }

    function pointerDown(event: PointerEvent) {
      if (!event.isPrimary || event.button !== 0 || count < 2) return;
      if ((event.target as HTMLElement).closest("a, button")) return;
      clearTimeout(wheelTimer);
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, start: target, distance: 0 };
      surface.setPointerCapture(event.pointerId);
      surface.dataset.drag = "true";
    }

    function pointerMove(event: PointerEvent) {
      if (event.pointerType === "mouse") {
        const bounds = surface.getBoundingClientRect();
        cursor.style.transform = `translate3d(${event.clientX - bounds.left}px,${event.clientY - bounds.top}px,0)`;
        cursor.hidden = false;
      }
      if (drag?.id !== event.pointerId) return;
      const dx = event.clientX - drag.x;
      const dy = drag.y - event.clientY;
      drag.distance = Math.max(drag.distance, Math.hypot(dx, dy));
      target = drag.start + (Math.abs(dx) >= Math.abs(dy) ? dx : dy) / Math.max(150, width * .2);
      wake();
    }

    function release(event: PointerEvent) {
      if (drag?.id !== event.pointerId) return;
      if (event.type === "pointerup" && drag.distance < 6) {
        const hit = document.elementsFromPoint(event.clientX, event.clientY)
          .find((element) => element instanceof HTMLElement && element.dataset.model !== undefined) as HTMLElement | undefined;
        if (hit) controls.current?.select(Number(hit.dataset.model));
      }
      target = Math.round(target);
      drag = undefined;
      delete surface.dataset.drag;
      wake();
    }

    function hideRing() {
      cursor.hidden = true;
    }

    const resize = new ResizeObserver(measure);
    resize.observe(surface);
    measure();
    surface.addEventListener("wheel", wheel, { passive: false });
    productRail.addEventListener("wheel", wheel, { passive: false });
    surface.addEventListener("pointerdown", pointerDown);
    surface.addEventListener("pointermove", pointerMove);
    surface.addEventListener("pointerup", release);
    surface.addEventListener("lostpointercapture", release);
    surface.addEventListener("pointerleave", hideRing);

    return () => {
      resize.disconnect();
      cancelAnimationFrame(animation);
      clearTimeout(wheelTimer);
      surface.removeEventListener("wheel", wheel);
      productRail.removeEventListener("wheel", wheel);
      surface.removeEventListener("pointerdown", pointerDown);
      surface.removeEventListener("pointermove", pointerMove);
      surface.removeEventListener("pointerup", release);
      surface.removeEventListener("lostpointercapture", release);
      surface.removeEventListener("pointerleave", hideRing);
    };
  }, [items]);

  return (
    <div className={styles.track} onKeyDown={(event) => {
      const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
      if (!forward && event.key !== "ArrowLeft" && event.key !== "ArrowUp") return;
      event.preventDefault();
      controls.current?.step(forward ? 1 : -1);
    }}>
      <section ref={stage} className={styles.stage} tabIndex={0} aria-label="Drink runway">
        <div ref={line} className={styles.line} aria-hidden="true">
          {items.map(({ id, image }, index) => (
            <div
              key={id}
              data-model={index}
              data-active={index === active ? "" : undefined}
              className={styles.model}
              hidden={index >= 5}
            >
              <Image src={image} alt="" fill unoptimized />
            </div>
          ))}
        </div>
        <div className={styles.stageFooter}>
          <div className={styles.drinkDetails} lang="en">
            <p className="sr-only" role="status" aria-atomic="true">{items[active].name}</p>
            <div ref={drinkNames} className={styles.drinkNames} aria-hidden="true">
              {(items.length === 2 ? [...items, ...items] : items).map((item, index) => (
                <p key={index} className={styles.drinkName} hidden={index !== 0}>{item.name}</p>
              ))}
            </div>
          </div>
          <div className={styles.footerNavigation}>
            <div className={styles.counterLabel} aria-hidden="true">
              <span>NO.</span>
              <span className={styles.numberWindow}>
                <span ref={roll} className={styles.roll}>
                  {[...items, items[0]].map((_, index) => <span key={index}>{number(index % items.length + 1)}</span>)}
                </span>
              </span>
              <span className={styles.total}>/ {number(items.length)}</span>
            </div>
            <div className={styles.controls}>
              <button type="button" aria-label="Previous drink" disabled={items.length < 2} onClick={() => controls.current?.step(-1)}>
                <FiChevronUp aria-hidden="true" />
              </button>
              <button type="button" aria-label="Next drink" disabled={items.length < 2} onClick={() => controls.current?.step(1)}>
                <FiChevronDown aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <span ref={ring} className={styles.ring} hidden aria-hidden="true" />
      </section>
      <aside ref={rail} className={styles.rail} aria-label="Menu items">
        {items.map(({ id, name, pName, group, category, image }, index) => (
          <button
            key={id}
            type="button"
            className={styles.card}
            aria-current={index === active ? "true" : undefined}
            tabIndex={index === active ? 0 : -1}
            style={{ "--offset": index } as React.CSSProperties}
            onClick={() => controls.current?.select(index)}
          >
            <span className={styles.cardIndex}>{number(index + 1)}</span>
            <span className={styles.cardContent}>
              <span className={styles.shot}>
                <Image src={image} alt="" fill unoptimized loading="eager" />
              </span>
              <span className={styles.cardMeta}>
                <span className={styles.category} lang="fa" dir="rtl">{group} / {category}</span>
                <strong lang="fa" dir="rtl">{pName}</strong>
                <span className={styles.english}>{name}</span>
              </span>
            </span>
            <span className={styles.price} aria-label="Price pending">-</span>
          </button>
        ))}
      </aside>
    </div>
  );
}

export function Runway() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchButton = useRef<HTMLButtonElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const search = normalize(query);
  const items = useMemo(() => entries.filter((entry) => entry.search.includes(search)), [search]);

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
    searchButton.current?.focus();
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <Link href="/" className={styles.brand}>SHAHIN<span>CAFÉ</span></Link>
          <h1 className={styles.tagline}>More than just coffee<span>.</span></h1>
        </div>
        <button
          ref={searchButton}
          type="button"
          className={styles.searchToggle}
          aria-label={searchOpen ? "Close search" : "Search drinks"}
          aria-expanded={searchOpen}
          aria-controls="drink-search"
          onClick={searchOpen ? closeSearch : () => setSearchOpen(true)}
        >
          {searchOpen ? <FiX aria-hidden="true" /> : <FiSearch aria-hidden="true" />}
        </button>
        <div id="drink-search" className={styles.searchPanel} hidden={!searchOpen}>
          <label className={styles.search}>
            <span className="sr-only">جست‌وجوی منو / Search menu</span>
            <input
              ref={searchInput}
              type="search"
              dir="auto"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  event.preventDefault();
                  closeSearch();
                }
              }}
              placeholder="جست‌وجو / Search"
            />
          </label>
        </div>
      </header>
      {items.length > 0 ? <Track key={search} items={items} /> : (
        <section className={styles.empty} role="status">
          <FiSearch aria-hidden="true" />
          <p lang="fa" dir="rtl">آیتمی با این عبارت پیدا نشد.</p>
          <p>No drinks match your search.</p>
        </section>
      )}
    </main>
  );
}
