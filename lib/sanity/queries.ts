import { groq } from "next-sanity";

export const menuItemsQuery = groq`
  *[_type == "menuItem"] | order(name asc) {
    _id,
    name,
    slug,
    category,
    basePrice,
    description,
    image,
    hasSizes,
    sizePrices,
    modifiers,
    requiresFlavor,
    flavorOptions
  }
`;
