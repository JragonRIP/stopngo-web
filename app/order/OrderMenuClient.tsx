"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import FadeInView from "@/app/components/FadeInView";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import MenuItemModal from "@/app/components/MenuItemModal";
import type { SanityMenuItem } from "@/lib/types/menu";
import { groupMenuByCategory } from "@/lib/types/menu";
import { urlForImage } from "@/lib/sanity/image";

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
      <main className="flex-1 pb-16 pt-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
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
                  <ul className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 lg:grid-cols-3">
                  {groupItems.map((item) => {
                    const img = urlForImage(item.image);
                    return (
                      <li key={item._id}>
                        <button
                          type="button"
                          onClick={() => setActive(item)}
                          className="group flex w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-black/25 text-left transition duration-300 hover:-translate-y-0.5 hover:border-sn-gold/35 hover:bg-black/40 hover:shadow-md hover:shadow-black/20 active:scale-[0.99] motion-reduce:hover:translate-y-0"
                        >
                          <div className="relative aspect-[4/3] w-full bg-black/50">
                            {img ? (
                              <Image
                                src={img}
                                alt=""
                                fill
                                className="object-cover transition duration-500 group-hover:scale-[1.02] group-hover:opacity-95 motion-reduce:group-hover:scale-100"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-xs text-white/30">
                                Photo coming soon
                              </div>
                            )}
                          </div>
                          <div className="flex flex-1 flex-col p-4">
                            <span className="font-semibold text-white">
                              {item.name}
                            </span>
                            {item.description ? (
                              <span className="mt-1 line-clamp-2 text-sm text-white/55">
                                {item.description}
                              </span>
                            ) : null}
                            <span className="mt-3 text-sm font-medium text-sn-gold">
                              {displayFromPrice(item)}
                            </span>
                          </div>
                        </button>
                      </li>
                    );
                  })}
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
