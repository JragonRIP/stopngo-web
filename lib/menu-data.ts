/**
 * Text menu transcribed from Stop 'N Go 2.0 printed sheets.
 * Prices in USD. Confirm at the window if anything changes.
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
  /** Shown after sized rows (e.g. specialty variants under energy) */
  afterSized?: string;
  sized?: SizedRow[];
  singles?: SingleRow[];
  duals?: DualRow[];
  bullets?: string[];
  /** Syrup / flavor names; sugarFree shows an SF tag on the item */
  flavors?: { name: string; sugarFree?: boolean }[];
  /** Small sub-list under a section (e.g. specialty bulls) */
  subitems?: { name: string; detail?: string }[];
};

export const textMenuSections: TextMenuSection[] = [
  {
    id: "cup-sizes",
    title: "Cup sizes",
    intro:
      "Hot drinks: 16 oz, 20 oz, 24 oz. Cold drinks: 16 oz, 24 oz, 32 oz.",
  },
  {
    id: "hot-drinks",
    title: "Hot drinks",
    intro: "Espresso drinks with steamed milk where noted.",
    sized: [
      {
        name: "House Brew",
        small: 1.99,
        medium: 2.25,
        large: 2.5,
      },
      {
        name: "Americano",
        description: "Espresso and water",
        small: 2.24,
        medium: 2.5,
        large: 2.75,
      },
      {
        name: "Café Latte",
        description: "Steamed milk and espresso",
        small: 2.45,
        medium: 2.65,
        large: 2.85,
      },
      {
        name: "Flavored Latte",
        description: "Steamed milk, espresso, flavor of choice",
        small: 3.45,
        medium: 3.95,
        large: 4.45,
      },
    ],
  },
  {
    id: "specialty-lattes",
    title: "Specialty lattes",
    intro:
      "Iced or blended add $0.25. Several flavors available in Sugar Free (SF) where noted.",
    sized: [
      {
        name: "Banana Bread Latte",
        description: "Caramel, banana, and hazelnut",
        small: 4.25,
        medium: 5.25,
        large: 6.25,
        notes: ["Available in Sugar Free"],
      },
      {
        name: "The Sugar Shack",
        description: "White chocolate and maple syrup",
        small: 4.25,
        medium: 5.25,
        large: 6.25,
      },
      {
        name: "White Chocolate Mocha",
        description: "White chocolate, steamed milk, and espresso",
        small: 4.25,
        medium: 5.25,
        large: 6.25,
        notes: ["Available in Sugar Free"],
      },
      {
        name: "Caramel Mocha",
        description: "Dark chocolate, caramel, steamed milk, and espresso",
        small: 4.25,
        medium: 5.25,
        large: 6.25,
        notes: ["Available in Sugar Free"],
      },
    ],
  },
  {
    id: "drink-add-ons",
    title: "Drink add ons and milk",
    bullets: [
      "Add additional flavor: $0.50",
      "Add additional espresso shot: $0.60",
      "Milk options: Whole, Skim, Almond",
    ],
  },
  {
    id: "general-beverages",
    title: "General beverages",
    sized: [
      {
        name: "Frozen Hot Chocolate",
        small: 4.85,
        medium: 5.85,
        large: 6.85,
      },
      {
        name: "Chai Latte",
        small: 3.75,
        medium: 4.25,
        large: 4.75,
        notes: ["Spice or Vanilla"],
      },
      {
        name: "Herbal Tea",
        small: 2.25,
        medium: 2.5,
        large: 2.75,
        notes: [
          "Earl Grey, Green Tea, Lemon Ginger, Pomegranate Blueberry",
        ],
      },
    ],
  },
  {
    id: "energy-drinks",
    title: "Energy drinks",
    sized: [
      {
        name: "Lotus",
        small: 4.5,
        medium: 5.5,
        large: 6.5,
        notes: ["Add Power Up $1.00", "Add Super Cream $0.50"],
      },
      {
        name: "Red Bull",
        description: "Flavor of choice",
        small: 4.5,
        medium: 5.5,
        large: 6.5,
      },
      {
        name: "Dirty Bull",
        description: "Flavor of choice and Half n Half",
        small: 4.75,
        medium: 5.75,
        large: 6.75,
      },
    ],
    afterSized:
      "Specialty Dirty Red Bulls use the same small, medium, and large prices as Dirty Bull ($4.75 / $5.75 / $6.75). All include Half n Half. Sugar Free is available except on Cotton Candy.",
    subitems: [
      { name: "Peaches and Cream", detail: "Peach syrup" },
      { name: "Pina Colada", detail: "Coconut and pineapple syrup" },
      { name: "Berry Bull", detail: "Blueberry, coconut, and vanilla" },
      { name: "Creamsicle", detail: "Orange and vanilla" },
      { name: "Cotton Candy", detail: "Cotton candy syrup" },
    ],
  },
  {
    id: "flavor-list",
    title: "Syrup flavor list",
    flavors: [
      { name: "Almond", sugarFree: true },
      { name: "Apple" },
      { name: "Banana", sugarFree: true },
      { name: "Black Berry", sugarFree: true },
      { name: "Blood Orange" },
      { name: "Blueberry", sugarFree: true },
      { name: "Blue Curacao" },
      { name: "Blue Raspberry", sugarFree: true },
      { name: "Butter Pecan" },
      { name: "Butter Rum", sugarFree: true },
      { name: "Butterscotch", sugarFree: true },
      { name: "Cantaloupe" },
      { name: "Caramel", sugarFree: true },
      { name: "Cheesecake" },
      { name: "Cherry", sugarFree: true },
      { name: "Cookie Dough", sugarFree: true },
      { name: "Coconut", sugarFree: true },
      { name: "Cotton Candy" },
      { name: "Cranberry" },
      { name: "Creme de Menthe" },
      { name: "Cupcake" },
      { name: "Dragon Fruit" },
      { name: "French Vanilla", sugarFree: true },
      { name: "Grape" },
      { name: "Green Apple", sugarFree: true },
      { name: "Guava" },
      { name: "Hazelnut", sugarFree: true },
      { name: "Huckleberry", sugarFree: true },
      { name: "Irish Cream" },
      { name: "Kiwi" },
      { name: "Lavender", sugarFree: true },
      { name: "Lime", sugarFree: true },
      { name: "Lychee" },
      { name: "Mango", sugarFree: true },
      { name: "Orange", sugarFree: true },
      { name: "Passion Fruit" },
      { name: "Peach", sugarFree: true },
      { name: "Peanut Butter" },
      { name: "Pineapple", sugarFree: true },
      { name: "Pistachio", sugarFree: true },
      { name: "Pomegranate", sugarFree: true },
      { name: "Prickly Pear" },
      { name: "Raspberry", sugarFree: true },
      { name: "Root Beer" },
      { name: "Shortbread" },
      { name: "Sour Candy" },
      { name: "Strawberry", sugarFree: true },
      { name: "Tangerine" },
      { name: "Tiramisu" },
      { name: "Toasted Marshmallow", sugarFree: true },
      { name: "Vanilla", sugarFree: true },
      { name: "Watermelon", sugarFree: true },
      { name: "White Chocolate", sugarFree: true },
      { name: "White Peach" },
    ],
  },
  {
    id: "breakfast",
    title: "Breakfast",
    singles: [
      {
        name: "Bagel",
        price: 3.0,
        notes: [
          "Plain, Blueberry, Everything, Cheddar, Jalapeno Cheddar, White Cheddar Bacon",
        ],
      },
      {
        name: "Bagel toasted with cream cheese",
        price: 4.25,
        notes: ["Plain or Berry cream cheese"],
      },
      {
        name: "Homemade jumbo muffin",
        price: 3.75,
        notes: ["Ask at the window for flavors of the day"],
      },
      {
        name: "Breakfast sandwich",
        description: "Egg and cheese on your choice of bagel",
        price: 6.0,
      },
      {
        name: "Breakfast sandwich with meat",
        description: "Egg, cheese, bacon or sausage on your choice of bagel",
        price: 7.0,
      },
      {
        name: "Breakfast burrito",
        description:
          "Egg, cheese, crispy tots, house made chipotle cream sauce",
        price: 5.5,
      },
      {
        name: "Breakfast burrito with meat",
        description:
          "Egg, cheese, crispy tots, bacon or sausage, house made chipotle cream sauce",
        price: 6.5,
      },
      {
        name: "Loaded breakfast tots",
        description:
          "Crispy tots, egg, cheese, bacon or sausage, house made chipotle cream sauce",
        price: 7.5,
      },
    ],
  },
  {
    id: "food",
    title: "Lunch and food",
    singles: [
      {
        name: "Bacon cheese Smash Burger",
        description: "With fries",
        price: 12.99,
      },
      {
        name: "Rodeo Smash Burger",
        description: "Cheese, BBQ, topped with onion ring",
        price: 12.99,
      },
      {
        name: "Mushroom Swiss Smash Burger",
        description: "With fries",
        price: 12.99,
      },
      {
        name: "Crispy chicken sandwich",
        description:
          "Crispy chicken, bacon, lettuce, tomato, cheese, mayo. With fries.",
        price: 12.5,
      },
      {
        name: "Crispy chicken melt",
        description:
          "Crispy chicken, grilled sourdough bread, American cheese, and bacon. With fries.",
        price: 11.99,
      },
      {
        name: "Cheese curds",
        price: 6.99,
      },
      {
        name: "8 bone in wings",
        description: "With fries",
        price: 13.5,
      },
    ],
    duals: [
      {
        name: "Crispy chicken Caesar wrap",
        description:
          "Crispy chicken, lettuce, Parmesan cheese, croutons, caesar dressing",
        leftLabel: "Wrap only",
        leftPrice: 9.5,
        rightLabel: "With fries",
        rightPrice: 11.0,
      },
      {
        name: "Crispy chicken bacon ranch wrap",
        description: "Crispy chicken, lettuce, cheese, ranch, and bacon",
        leftLabel: "Wrap only",
        leftPrice: 9.5,
        rightLabel: "With fries",
        rightPrice: 11.0,
      },
      {
        name: "Crispy chicken chipotle wrap",
        description: "Crispy chicken, lettuce, cheese, chipotle, and bacon",
        leftLabel: "Wrap only",
        leftPrice: 9.5,
        rightLabel: "With fries",
        rightPrice: 11.0,
      },
    ],
    bullets: [
      "Consuming undercooked meats or eggs may increase your risk of foodborne illness.",
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
