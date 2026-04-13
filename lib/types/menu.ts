export type MenuCategory =
  | "Hot Drinks"
  | "Energy Drinks"
  | "Breakfast"
  | "Lunch/Food Menu"
  | "Specials";

export interface MenuItemModifier {
  name?: string;
  price?: number;
}

/** Sanity flavor row (new schema). Legacy CMS may still have plain strings in the array. */
export interface MenuItemFlavorOption {
  name?: string;
  price?: number;
  _key?: string;
}

export type FlavorOptionRaw = string | MenuItemFlavorOption;

/**
 * Normalize flavor options from Sanity: supports legacy string[] and object rows with optional price.
 */
export function normalizeFlavorOptions(
  options?: FlavorOptionRaw[] | null
): { name: string; price: number }[] {
  if (!options?.length) return [];
  const out: { name: string; price: number }[] = [];
  for (const entry of options) {
    if (typeof entry === "string") {
      const name = entry.trim();
      if (name) out.push({ name, price: 0 });
      continue;
    }
    if (entry && typeof entry === "object") {
      const name =
        typeof entry.name === "string" ? entry.name.trim() : "";
      if (!name) continue;
      const raw = entry.price;
      const price =
        typeof raw === "number" && Number.isFinite(raw) && raw >= 0
          ? raw
          : 0;
      out.push({ name, price });
    }
  }
  return out;
}

export interface MenuItemSizePrices {
  small?: number;
  medium?: number;
  large?: number;
}

export interface SanityMenuItem {
  _id: string;
  name: string;
  slug: { current: string };
  category: MenuCategory | string;
  basePrice: number;
  description?: string;
  image?: {
    _type?: string;
    asset?: { _ref: string; _type?: string };
    hotspot?: unknown;
    crop?: unknown;
  };
  hasSizes?: boolean;
  sizePrices?: MenuItemSizePrices;
  modifiers?: MenuItemModifier[];
  requiresFlavor?: boolean;
  flavorOptions?: FlavorOptionRaw[];
}

export const MENU_CATEGORY_ORDER: string[] = [
  "Hot Drinks",
  "Energy Drinks",
  "Breakfast",
  "Lunch/Food Menu",
  "Specials",
];

export function groupMenuByCategory(items: SanityMenuItem[]) {
  const map = new Map<string, SanityMenuItem[]>();
  for (const item of items) {
    const key = item.category || "Specials";
    const list = map.get(key) ?? [];
    list.push(item);
    map.set(key, list);
  }
  const ordered: { category: string; items: SanityMenuItem[] }[] = [];
  for (const cat of MENU_CATEGORY_ORDER) {
    const group = map.get(cat);
    if (group?.length) ordered.push({ category: cat, items: group });
    map.delete(cat);
  }
  for (const [category, group] of map) {
    if (group.length) ordered.push({ category, items: group });
  }
  return ordered;
}

export function resolveBaseUnitPrice(
  item: SanityMenuItem,
  size?: "small" | "medium" | "large"
): number {
  if (item.hasSizes && size && item.sizePrices) {
    const p = item.sizePrices[size];
    if (typeof p === "number") return p;
  }
  return item.basePrice ?? 0;
}
