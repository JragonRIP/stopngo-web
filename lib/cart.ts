import { create } from "zustand";

export interface CartModifier {
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  name: string;
  basePrice: number;
  quantity: number;
  selectedSize?: "small" | "medium" | "large";
  selectedFlavor?: string;
  selectedModifiers: CartModifier[];
  calculatedItemTotal: number;
}

function unitTotal(item: Omit<CartItem, "quantity" | "calculatedItemTotal">) {
  const modSum = item.selectedModifiers.reduce((s, m) => s + m.price, 0);
  return item.basePrice + modSum;
}

function recalcLine(
  item: Omit<CartItem, "calculatedItemTotal">
): CartItem {
  const line = unitTotal(item) * item.quantity;
  return { ...item, calculatedItemTotal: Math.round(line * 100) / 100 };
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "calculatedItemTotal">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item) => {
    const line = recalcLine(item);
    set((s) => ({ items: [...s.items, line] }));
  },
  removeItem: (id) =>
    set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  updateQuantity: (id, quantity) => {
    if (quantity < 1) {
      get().removeItem(id);
      return;
    }
    set((s) => ({
      items: s.items.map((i) =>
        i.id === id ? recalcLine({ ...i, quantity }) : i
      ),
    }));
  },
  clearCart: () => set({ items: [] }),
  getCartTotal: () => {
    const sum = get().items.reduce((acc, i) => acc + i.calculatedItemTotal, 0);
    return Math.round(sum * 100) / 100;
  },
}));

export function getCartItemCount(items: CartItem[]) {
  return items.reduce((n, i) => n + i.quantity, 0);
}
