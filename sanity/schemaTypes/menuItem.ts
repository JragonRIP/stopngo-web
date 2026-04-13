import { defineField, defineType } from "sanity";

const categories = [
  { title: "Hot Drinks", value: "Hot Drinks" },
  { title: "Energy Drinks", value: "Energy Drinks" },
  { title: "Breakfast", value: "Breakfast" },
  { title: "Lunch/Food Menu", value: "Lunch/Food Menu" },
  { title: "Specials", value: "Specials" },
];

export const menuItem = defineType({
  name: "menuItem",
  title: "Menu Item",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: categories, layout: "dropdown" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "basePrice",
      title: "Base price (USD)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "hasSizes",
      title: "Has sizes (S / M / L pricing)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sizePrices",
      title: "Size prices",
      type: "object",
      fields: [
        defineField({ name: "small", title: "Small", type: "number" }),
        defineField({ name: "medium", title: "Medium", type: "number" }),
        defineField({ name: "large", title: "Large", type: "number" }),
      ],
      hidden: ({ parent }) => !parent?.hasSizes,
    }),
    defineField({
      name: "modifiers",
      title: "Add-ons / modifiers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "price",
              title: "Extra price (USD)",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            }),
          ],
          preview: {
            select: { title: "name", price: "price" },
            prepare({ title, price }) {
              return {
                title: title ?? "Modifier",
                subtitle: price != null ? `+$${price}` : "",
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "requiresFlavor",
      title: "Requires flavor selection",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "flavorOptions",
      title: "Flavor options",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Flavor name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "price",
              title: "Extra cost (USD)",
              type: "number",
              description:
                "Optional upcharge for this flavor (e.g. 0.5 for +$0.50). Leave empty or 0 for no extra charge.",
              initialValue: 0,
              validation: (Rule) => Rule.min(0),
            }),
          ],
          preview: {
            select: { title: "name", price: "price" },
            prepare({ title, price }) {
              const p =
                typeof price === "number" && price > 0 ? `+$${price}` : "Included";
              return {
                title: title ?? "Flavor",
                subtitle: p,
              };
            },
          },
        },
      ],
      hidden: ({ parent }) => !parent?.requiresFlavor,
      description:
        "Shown as a dropdown when Requires flavor is enabled. Set an extra cost per flavor when it costs more (e.g. specialty syrups).",
    }),
  ],
  preview: {
    select: { title: "name", category: "category", media: "image" },
    prepare({ title, category, media }) {
      return { title, subtitle: category, media };
    },
  },
});
