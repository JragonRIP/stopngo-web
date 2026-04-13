"use client";

import { useMemo, useState } from "react";
import FadeInView from "@/app/components/FadeInView";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import MenuItemModal from "@/app/components/MenuItemModal";
import type { SanityMenuItem } from "@/lib/types/menu";
import { groupMenuByCategory } from "@/lib/types/menu";

function displayFromPrice(item: SanityMenuItem) {
  if (item.hasSizes && item.sizePrices) {
    const nums = [
      item.sizePrices.small,
      item.sizePrices.medium,
      item.sizePrices.large,
    ].filter((n): n is number => typeof n === "number");
    if (nums.length) {
      const low = Math.min(...nums);
      return `From $${low.toFixed(2)}`;
    }
  }
  return `$${(item.basePrice ?? 0).toFixed(2)}`;
}

type Props = {
  items: SanityMenuItem[];
};

export default function OrderMenuClient({ items }: Props) {
  const [active, setActive] = useState<SanityMenuItem | null>(null);
  const grouped = useMemo(() => groupMenuByCategory(items), [items]);

  return (
    <>
      <Header />
      <main className="flex-1 pb-8 pt-6">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            Order online
          </h1>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-white/65 sm:text-[1.05rem]">
            Tap an item to choose size, flavor, and add-ons. Pay securely at
            checkout, and we&apos;ll have it ready for pickup.
          </p>

          <div className="mt-10 space-y-12 sm:mt-12 sm:space-y-14">
            {grouped.map(({ category, items: groupItems }, gi) => (
              <FadeInView key={category} delayMs={gi * 40}>
                <section id={category.replace(/\s+/g, "-")}>
                  <h2 className="border-b border-sn-gold/30 pb-2 text-base font-semibold tracking-wide text-sn-gold sm:text-lg">
                    {category}
                  </h2>
                  <ul className="mt-4 divide-y divide-white/10 border-y border-white/10 sm:mt-5">
                    {groupItems.map((item) => (
                      <li key={item._id}>
                        <button
                          type="button"
                          onClick={() => setActive(item)}
                          className="flex w-full gap-4 py-4 text-left transition hover:bg-white/[0.03] active:bg-white/[0.05] sm:items-start sm:gap-6 sm:py-5"
                        >
                          <div className="min-w-0 flex-1">
                            <span className="font-semibold text-white">
                              {item.name}
                            </span>
                            {item.description ? (
                              <p className="mt-1 text-sm leading-relaxed text-white/55">
                                {item.description}
                              </p>
                            ) : null}
                          </div>
                          <span className="shrink-0 text-sm font-medium tabular-nums text-sn-gold sm:pt-0.5">
                            {displayFromPrice(item)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              </FadeInView>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <MenuItemModal item={active} onClose={() => setActive(null)} />
    </>
  );
}
