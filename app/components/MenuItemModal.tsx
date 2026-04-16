"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import type { SanityMenuItem } from "@/lib/types/menu";
import {
  normalizeFlavorOptions,
  resolveBaseUnitPrice,
} from "@/lib/types/menu";
import { useCartStore, type CartModifier } from "@/lib/cart";
import { urlForImage } from "@/lib/sanity/image";

function normalizeModifierPrice(raw: unknown): number {
  if (typeof raw !== "number" || !Number.isFinite(raw) || raw < 0) return 0;
  return raw;
}

function cartLineId(
  slug: string,
  modifiers: CartModifier[],
  size?: string,
  flavor?: string
) {
  const modKey = [...modifiers.map((x) => x.name)].sort().join("|");
  return [slug, size ?? "", flavor ?? "", modKey].join("::");
}

type Props = {
  item: SanityMenuItem | null;
  onClose: () => void;
};

const sizes = [
  { key: "small" as const, label: "Small" },
  { key: "medium" as const, label: "Medium" },
  { key: "large" as const, label: "Large" },
];

export default function MenuItemModal({ item, onClose }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const headingId = useId();

  const [selectedSize, setSelectedSize] = useState<
    "small" | "medium" | "large" | undefined
  >(undefined);
  const [selectedFlavor, setSelectedFlavor] = useState<string>("");
  const [modifierState, setModifierState] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    if (!item) return;
    if (item.hasSizes) {
      const order: ("small" | "medium" | "large")[] = [
        "small",
        "medium",
        "large",
      ];
      const first = order.find(
        (k) => typeof item.sizePrices?.[k] === "number"
      );
      setSelectedSize(first);
    } else {
      setSelectedSize(undefined);
    }
    setSelectedFlavor("");
    setModifierState({});
  }, [item]);

  const baseUnit = useMemo(() => {
    if (!item) return 0;
    return resolveBaseUnitPrice(item, selectedSize);
  }, [item, selectedSize]);

  const selectedModifiers = useMemo(() => {
    if (!item?.modifiers?.length) return [];
    const out: CartModifier[] = [];
    for (const mod of item.modifiers) {
      const name = typeof mod.name === "string" ? mod.name.trim() : "";
      if (!name) continue;
      const price = normalizeModifierPrice(mod.price);
      if (modifierState[name]) out.push({ name, price });
    }
    return out;
  }, [item, modifierState]);

  const flavorList = useMemo(
    () => normalizeFlavorOptions(item?.flavorOptions ?? null),
    [item]
  );

  const flavorExtra = useMemo(() => {
    if (!selectedFlavor.trim()) return 0;
    const row = flavorList.find((f) => f.name === selectedFlavor);
    return row?.price ?? 0;
  }, [flavorList, selectedFlavor]);

  const unitPreview = useMemo(() => {
    const modSum = selectedModifiers.reduce((s, m) => s + m.price, 0);
    return Math.round((baseUnit + flavorExtra + modSum) * 100) / 100;
  }, [baseUnit, flavorExtra, selectedModifiers]);

  const onToggleModifier = useCallback((name: string) => {
    setModifierState((prev) => ({ ...prev, [name]: !prev[name] }));
  }, []);

  const handleAdd = useCallback(() => {
    if (!item) return;
    if (item.requiresFlavor && !selectedFlavor.trim()) return;
    if (item.hasSizes && !selectedSize) return;

    const mods = selectedModifiers;
    const id = cartLineId(
      item.slug.current,
      mods,
      selectedSize,
      selectedFlavor || undefined
    );

    addItem({
      id,
      name: item.name,
      basePrice: baseUnit + flavorExtra,
      quantity: 1,
      selectedSize: item.hasSizes ? selectedSize : undefined,
      selectedFlavor: item.requiresFlavor ? selectedFlavor : undefined,
      selectedModifiers: mods,
    });
    onClose();
  }, [
    item,
    selectedFlavor,
    selectedSize,
    selectedModifiers,
    baseUnit,
    flavorExtra,
    addItem,
    onClose,
  ]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  if (!item) return null;

  const imgUrl = urlForImage(item.image);
  const canAdd =
    (!item.requiresFlavor || selectedFlavor.trim().length > 0) &&
    (!item.hasSizes || Boolean(selectedSize));

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className="flex max-h-[min(92vh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-white/15 bg-sn-base shadow-2xl sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-white/10 px-5 py-4">
          <h2 id={headingId} className="text-lg font-semibold text-white">
            {item.name}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {imgUrl ? (
            <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-lg bg-black/40">
              <Image
                src={imgUrl}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 32rem) 100vw, 32rem"
              />
            </div>
          ) : null}
          {item.description ? (
            <p className="text-sm leading-relaxed text-white/70">
              {item.description}
            </p>
          ) : null}

          {item.hasSizes ? (
            <fieldset className="mt-6">
              <legend className="text-xs font-semibold uppercase tracking-wider text-sn-silver">
                Size
              </legend>
              <div className="mt-2 space-y-2">
                {sizes.map(({ key, label }) => {
                  const price = item.sizePrices?.[key];
                  if (typeof price !== "number") return null;
                  return (
                    <label
                      key={key}
                      className="flex cursor-pointer items-center gap-3 rounded-md border border-white/10 px-3 py-2.5 transition hover:border-sn-gold/40"
                    >
                      <input
                        type="radio"
                        name="size"
                        className="h-4 w-4 border-white/30 bg-transparent text-sn-gold focus:ring-sn-gold"
                        checked={selectedSize === key}
                        onChange={() => setSelectedSize(key)}
                      />
                      <span className="flex-1 text-sm text-white">
                        {label}
                      </span>
                      <span className="text-sm text-sn-silver">
                        ${price.toFixed(2)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ) : null}

          {item.requiresFlavor ? (
            <div className="mt-6">
              <label
                htmlFor="flavor-select"
                className="text-xs font-semibold uppercase tracking-wider text-sn-silver"
              >
                Flavor
              </label>
              {flavorList.length > 0 ? (
                <select
                  id="flavor-select"
                  value={selectedFlavor}
                  onChange={(e) => setSelectedFlavor(e.target.value)}
                  className="mt-2 w-full rounded-md border border-white/15 bg-black/30 px-3 py-2.5 text-sm text-white focus:border-sn-gold focus:outline-none focus:ring-1 focus:ring-sn-gold"
                >
                  <option value="">Choose a flavor…</option>
                  {flavorList.map((f, i) => (
                    <option
                      key={`${f.name}-${i}`}
                      value={f.name}
                    >
                      {f.name}
                      {f.price > 0
                        ? ` (+$${f.price.toFixed(2)})`
                        : ""}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id="flavor-select"
                  type="text"
                  value={selectedFlavor}
                  onChange={(e) => setSelectedFlavor(e.target.value)}
                  placeholder="Type your flavor"
                  className="mt-2 w-full rounded-md border border-white/15 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-sn-gold focus:outline-none focus:ring-1 focus:ring-sn-gold"
                />
              )}
            </div>
          ) : null}

          {item.modifiers && item.modifiers.length > 0 ? (
            <fieldset className="mt-6">
              <legend className="text-xs font-semibold uppercase tracking-wider text-sn-silver">
                Add-ons
              </legend>
              <div className="mt-2 space-y-2">
                {item.modifiers.map((mod) => {
                  const name =
                    typeof mod.name === "string" ? mod.name.trim() : "";
                  if (!name) return null;
                  const price = normalizeModifierPrice(mod.price);
                  return (
                    <label
                      key={name}
                      className="flex cursor-pointer items-center gap-3 rounded-md border border-white/10 px-3 py-2.5 transition hover:border-white/20"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-white/30 bg-transparent text-sn-gold focus:ring-sn-gold"
                        checked={Boolean(modifierState[name])}
                        onChange={() => onToggleModifier(name)}
                      />
                      <span className="flex-1 text-sm text-white">{name}</span>
                      <span className="text-sm text-sn-silver">
                        {price > 0
                          ? `+$${price.toFixed(2)}`
                          : "Included"}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ) : null}
        </div>

        <div className="border-t border-white/10 bg-black/25 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-white/60">Item total</span>
            <span className="text-lg font-semibold text-white">
              ${unitPreview.toFixed(2)}
            </span>
          </div>
          <button
            type="button"
            disabled={!canAdd}
            onClick={handleAdd}
            className="h-11 w-full rounded-md bg-sn-gold text-sm font-semibold text-sn-ink transition hover:bg-[#ffc85c] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
