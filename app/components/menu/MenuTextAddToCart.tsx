"use client";

import { useCallback, useState } from "react";
import { useCartStore } from "@/lib/cart";
import { formatPrice, type DualRow, type SingleRow, type SizedRow } from "@/lib/menu-data";
import { textMenuCartId } from "@/lib/menu-cart-utils";

function AddedFlash({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span
      className="text-[11px] font-medium text-sn-gold"
      role="status"
      aria-live="polite"
    >
      Added
    </span>
  );
}

const SIZE_KEYS = [
  { key: "small" as const, label: "S" },
  { key: "medium" as const, label: "M" },
  { key: "large" as const, label: "L" },
];

export function MenuSizedRowCart({
  sectionId,
  row,
  layout = "desktop",
}: {
  sectionId: string;
  row: SizedRow;
  layout?: "desktop" | "mobile";
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [size, setSize] = useState<"small" | "medium" | "large">("medium");
  const [flash, setFlash] = useState(false);

  const add = useCallback(() => {
    const price = row[size];
    addItem({
      id: textMenuCartId(sectionId, row.name, size),
      name: row.name,
      basePrice: price,
      quantity: 1,
      selectedSize: size,
      selectedModifiers: [],
    });
    setFlash(true);
    window.setTimeout(() => setFlash(false), 1400);
  }, [addItem, row, sectionId, size]);

  const btnClass =
    "rounded-md bg-sn-gold/90 px-3 py-1.5 text-xs font-semibold text-sn-ink transition hover:bg-sn-gold active:scale-[0.98]";

  if (layout === "mobile") {
    return (
      <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase tracking-wide text-sn-silver">
            Size
          </span>
          <div className="flex rounded-lg border border-white/15 p-0.5">
            {SIZE_KEYS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setSize(key)}
                className={`min-h-9 min-w-9 rounded-md text-xs font-semibold transition ${
                  size === key
                    ? "bg-sn-gold text-sn-ink"
                    : "text-white/70 hover:bg-white/10"
                }`}
                aria-pressed={size === key}
              >
                {label}
              </button>
            ))}
          </div>
          <span className="text-sm tabular-nums text-sn-gold">
            {formatPrice(row[size])}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <AddedFlash show={flash} />
          <button type="button" onClick={add} className={`${btnClass} w-full sm:w-auto`}>
            Add to cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/10 pt-3">
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] uppercase tracking-wide text-sn-silver">
          Size
        </span>
        <div className="flex rounded-md border border-white/15 p-0.5">
          {SIZE_KEYS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setSize(key)}
              className={`min-h-8 min-w-8 rounded text-xs font-semibold transition ${
                size === key
                  ? "bg-sn-gold text-sn-ink"
                  : "text-white/70 hover:bg-white/10"
              }`}
              aria-pressed={size === key}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <AddedFlash show={flash} />
      <button type="button" onClick={add} className={btnClass}>
        Add to cart
      </button>
    </div>
  );
}

export function MenuSingleRowCart({
  sectionId,
  row,
}: {
  sectionId: string;
  row: SingleRow;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [flash, setFlash] = useState(false);

  const add = useCallback(() => {
    addItem({
      id: textMenuCartId(sectionId, row.name),
      name: row.name,
      basePrice: row.price,
      quantity: 1,
      selectedModifiers: [],
    });
    setFlash(true);
    window.setTimeout(() => setFlash(false), 1400);
  }, [addItem, row, sectionId]);

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-0 sm:shrink-0 sm:flex-col sm:items-end">
      <AddedFlash show={flash} />
      <button
        type="button"
        onClick={add}
        className="rounded-md border border-sn-gold/40 bg-sn-gold/15 px-3 py-1.5 text-xs font-semibold text-sn-gold transition hover:bg-sn-gold/25"
      >
        Add to cart
      </button>
    </div>
  );
}

export function MenuDualRowCart({
  sectionId,
  row,
}: {
  sectionId: string;
  row: DualRow;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [flash, setFlash] = useState<"left" | "right" | null>(null);

  const addLeft = useCallback(() => {
    addItem({
      id: textMenuCartId(sectionId, row.name, "a"),
      name: `${row.name} (${row.leftLabel})`,
      basePrice: row.leftPrice,
      quantity: 1,
      selectedModifiers: [],
    });
    setFlash("left");
    window.setTimeout(() => setFlash(null), 1400);
  }, [addItem, row, sectionId]);

  const addRight = useCallback(() => {
    addItem({
      id: textMenuCartId(sectionId, row.name, "b"),
      name: `${row.name} (${row.rightLabel})`,
      basePrice: row.rightPrice,
      quantity: 1,
      selectedModifiers: [],
    });
    setFlash("right");
    window.setTimeout(() => setFlash(null), 1400);
  }, [addItem, row, sectionId]);

  const btn =
    "rounded-md border border-white/15 bg-white/[0.06] px-2.5 py-1.5 text-[11px] font-semibold text-white transition hover:border-sn-gold/35 hover:bg-sn-gold/10";

  return (
    <div className="mt-3 flex flex-col gap-2 sm:mt-0 sm:min-w-[12rem]">
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={addLeft} className={btn}>
          Add · {row.leftLabel} ({formatPrice(row.leftPrice)})
        </button>
        <AddedFlash show={flash === "left"} />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={addRight} className={btn}>
          Add · {row.rightLabel} ({formatPrice(row.rightPrice)})
        </button>
        <AddedFlash show={flash === "right"} />
      </div>
    </div>
  );
}
