/**
 * Edelweiss Coffee — browse menu (representative items and sample pricing).
 * Every drink is made to order; confirm current prices and specials at the window.
 */

export type SizedRow = {
  name: string;
  description?: string;
  small: number;
  medium: number;
  large: number;
  notes?: string[];
};

export type SingleRow = {
  name: string;
  description?: string;
  price: number;
  notes?: string[];
};

export type DualRow = {
  name: string;
  description?: string;
  leftLabel: string;
  leftPrice: number;
  rightLabel: string;
  rightPrice: number;
};

export type TextMenuSection = {
  id: string;
  title: string;
  intro?: string;
  afterSized?: string;
  sized?: SizedRow[];
  singles?: SingleRow[];
  duals?: DualRow[];
  bullets?: string[];
  flavors?: { name: string; sugarFree?: boolean }[];
  subitems?: { name: string; detail?: string }[];
};

export const textMenuSections: TextMenuSection[] = [
  {
    id: "cup-sizes",
    title: "Cup sizes",
    intro:
      "Hot drinks are typically 12 oz, 16 oz, and 20 oz. Iced and blended drinks: 16 oz, 24 oz, and 32 oz. Ask what’s pouring today.",
  },
  {
    id: "fan-favorites",
    title: "Fan favorites — ask for these by name",
    intro:
      "These customer-loved flavors are perfect in lattes, mochas, and blended treats. Not sure? We’ll help you pick your sweetness and strength.",
    subitems: [
      { name: "Hot Buttered Toffee", detail: "Warm, buttery toffee notes" },
      { name: "Heath", detail: "Toffee and milk chocolate" },
      { name: "Double Decadence", detail: "Extra-rich chocolate indulgence" },
      { name: "Snickers", detail: "Chocolate, caramel, and nutty comfort" },
      { name: "Milky Way", detail: "Chocolate, caramel, and vanilla" },
      { name: "Almond Joy", detail: "Chocolate, almond, and coconut" },
    ],
  },
  {
    id: "hot-espresso-drinks",
    title: "Hot espresso drinks",
    intro:
      "Espresso crafted with Crimson Cup beans, steamed milk, and your choice of flavors. Signature Dulce de Leche Latte and other monthly specials rotate—ask at the window.",
    sized: [
      {
        name: "Espresso",
        description: "Double shot",
        small: 2.75,
        medium: 3.25,
        large: 3.75,
      },
      {
        name: "Americano",
        description: "Espresso and hot water",
        small: 2.95,
        medium: 3.45,
        large: 3.95,
      },
      {
        name: "Cappuccino",
        description: "Espresso, steamed milk, dense foam",
        small: 3.65,
        medium: 4.15,
        large: 4.65,
      },
      {
        name: "Café Latte",
        description: "Espresso and silky steamed milk",
        small: 3.85,
        medium: 4.35,
        large: 4.85,
      },
      {
        name: "Flavored Latte",
        description: "Latte with syrup or sauce of your choice",
        small: 4.35,
        medium: 4.85,
        large: 5.35,
      },
      {
        name: "Mocha / White Mocha",
        description: "Espresso, chocolate or white chocolate, steamed milk",
        small: 4.55,
        medium: 5.05,
        large: 5.55,
      },
      {
        name: "Caramel Macchiato",
        description: "Vanilla milk marked with espresso and caramel",
        small: 4.65,
        medium: 5.15,
        large: 5.65,
      },
      {
        name: "House Brew",
        description: "Drip coffee, always fresh",
        small: 2.15,
        medium: 2.45,
        large: 2.75,
      },
    ],
  },
  {
    id: "iced-frozen-beverages",
    title: "Iced & frozen beverages",
    intro:
      "Iced lattes, cold brew, blended freezes, and more—made to order. Try a Dulce de Leche Latte iced or blended when it’s featured.",
    sized: [
      {
        name: "Iced Latte",
        description: "Espresso, cold milk, ice",
        small: 4.15,
        medium: 4.65,
        large: 5.15,
      },
      {
        name: "Iced Flavored Latte",
        small: 4.55,
        medium: 5.05,
        large: 5.55,
      },
      {
        name: "Cold Brew",
        description: "Slow-steeped and smooth",
        small: 3.75,
        medium: 4.25,
        large: 4.75,
      },
      {
        name: "Iced Americano",
        small: 3.25,
        medium: 3.75,
        large: 4.25,
      },
      {
        name: "Frozen Latte / Frappé",
        description: "Blended with ice; add flavors",
        small: 5.25,
        medium: 5.75,
        large: 6.25,
      },
      {
        name: "Iced Mocha",
        small: 4.75,
        medium: 5.25,
        large: 5.75,
      },
    ],
  },
  {
    id: "coffee-alternatives",
    title: "Coffee alternatives",
    intro:
      "Chai, hot chocolate, fruit smoothies, Italian sodas, and French sodas—customize syrups and toppings the same way you would an espresso drink.",
    sized: [
      {
        name: "Chai Latte",
        description: "Spiced or vanilla",
        small: 3.95,
        medium: 4.45,
        large: 4.95,
      },
      {
        name: "Hot Chocolate",
        description: "Steamed milk and rich cocoa",
        small: 3.45,
        medium: 3.95,
        large: 4.45,
      },
      {
        name: "Steamer",
        description: "Flavored steamed milk, no coffee",
        small: 3.25,
        medium: 3.75,
        large: 4.25,
      },
    ],
    singles: [
      {
        name: "Fruit smoothie",
        description: "Blended fruit and ice; flavor of the day",
        price: 5.95,
        notes: ["Ask which fruits are in the blender today"],
      },
      {
        name: "Italian soda",
        description: "Sparkling water and syrup over ice; add cream",
        price: 3.95,
      },
      {
        name: "French soda",
        description: "Italian soda finished with a float of half & half",
        price: 4.45,
      },
      {
        name: "Loose-leaf and herbal teas",
        description: "Hot or iced",
        price: 2.75,
        notes: ["Selection varies—ask at the window"],
      },
    ],
  },
  {
    id: "fresh-baked-goods",
    title: "Fresh baked goods",
    intro:
      "Pastries and baked treats delivered fresh; availability changes daily.",
    singles: [
      {
        name: "Muffins & scones",
        description: "Sweet and seasonal varieties",
        price: 3.75,
      },
      {
        name: "Coffee cake & loaf slices",
        price: 3.95,
      },
      {
        name: "Bagels",
        description: "With butter, cream cheese, or as a breakfast sandwich",
        price: 3.5,
      },
      {
        name: "Cookies & bars",
        price: 2.95,
      },
    ],
  },
  {
    id: "drink-customization",
    title: "How we build your drink",
    intro:
      "We want your cup exactly how you like it—stronger, sweeter, lighter, or decaf.",
    bullets: [
      "All espresso-based drinks can be ordered decaf.",
      "Want more or less espresso, or an extra shot? Just ask—we’re happy to adjust.",
      "Choose your milk: whole, skim, half & half, and non-dairy options when available.",
      "Add a flavor from our syrup list, or combine a few—this is your drink.",
    ],
  },
  {
    id: "syrup-flavors",
    title: "Syrup & flavor list",
    intro:
      "Many flavors are available sugar free (SF)—ask when you order. Not every flavor is in stock every day; we’ll suggest a close substitute if needed.",
    flavors: [
      { name: "Almond", sugarFree: true },
      { name: "Apple" },
      { name: "Banana", sugarFree: true },
      { name: "Blackberry", sugarFree: true },
      { name: "Blood Orange" },
      { name: "Blueberry", sugarFree: true },
      { name: "Butter Pecan" },
      { name: "Butter Rum", sugarFree: true },
      { name: "Butterscotch", sugarFree: true },
      { name: "Caramel", sugarFree: true },
      { name: "Cherry", sugarFree: true },
      { name: "Chocolate", sugarFree: true },
      { name: "Coconut", sugarFree: true },
      { name: "Cookie Dough", sugarFree: true },
      { name: "Cotton Candy" },
      { name: "French Vanilla", sugarFree: true },
      { name: "Green Apple", sugarFree: true },
      { name: "Hazelnut", sugarFree: true },
      { name: "Huckleberry", sugarFree: true },
      { name: "Irish Cream" },
      { name: "Lavender", sugarFree: true },
      { name: "Lemon" },
      { name: "Lime", sugarFree: true },
      { name: "Mango", sugarFree: true },
      { name: "Maple" },
      { name: "Orange", sugarFree: true },
      { name: "Peach", sugarFree: true },
      { name: "Peanut Butter" },
      { name: "Peppermint", sugarFree: true },
      { name: "Pineapple", sugarFree: true },
      { name: "Pistachio", sugarFree: true },
      { name: "Pomegranate", sugarFree: true },
      { name: "Pumpkin" },
      { name: "Raspberry", sugarFree: true },
      { name: "Salted Caramel" },
      { name: "Strawberry", sugarFree: true },
      { name: "Toasted Marshmallow", sugarFree: true },
      { name: "Toffee" },
      { name: "Vanilla", sugarFree: true },
      { name: "Watermelon", sugarFree: true },
      { name: "White Chocolate", sugarFree: true },
    ],
  },
];

/** Labels for the menu page jump-to-section control */
export const menuJumpLinks = textMenuSections.map((s) => ({
  id: s.id,
  label: s.title,
}));

export function formatPrice(n: number) {
  return `$${n.toFixed(2)}`;
}
